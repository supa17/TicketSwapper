import * as _ from "lodash";
import {EventData} from "./event";
import {Cart} from "./cart";
import notifier from 'node-notifier'

export type AvailableTicket = {
    hash: string,
    url: string,
    listingId: string
}

function getAvailableTickets(eventData: EventData): { hash: string, url: string, listingId: string }[] {
    const nodes = _.get(eventData, '[0].data.node.event.types.edges.[0].node.availableListings.edges',
        _.get(eventData, '[0].data.node.types.edges.[0].node.availableListings.edges', []))

    return nodes.map(node => {
        const path = _.get(node, 'node.uri.path', '')
        const pathSplit = path.split("?")
        return {
            hash: getTicketHash(pathSplit[0]),
            url: pathSplit[0],
            listingId: _.get(node, 'node.id')
        }
    })
}


async function buyTicket(token: string, ticket: AvailableTicket): Promise<boolean> {
    const result = await Cart.addTicket(token, {
        listingId: ticket.listingId,
        hash: ticket.hash
    });

    const cartId = _.get(result, '[0].data.addTicketsToCart.cart.id')
    const errors = _.get(result, '[0].data.addTicketsToCart.errors')

    if (errors && errors.length > 0) {
        console.log(new Date(), 'Could not reservate ticket.', errors[0].code)
    } else if (cartId) {
        const msg = `Reservated ticket ${ticket.listingId}`
        console.log(new Date(), msg)
        notifier.notify(msg);
        return true;
    }
    return false;
}


export const Ticket = {
    getAvailableTickets,
    buyTicket
}

function getTicketHash(url: String) {
    if (url && url.indexOf('/') >= 0) {
        const split = url.split('/');
        return split[split.length - 1]
    }
    return null
}
