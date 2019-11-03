import {Event} from "./event";
import {Ticket} from "./ticket";

export async function start(url: string, token: string) {
    const eventId = await Event.getEventIdFromURL(url);

    async function loop() {
        const data = await Event.getData(eventId)

        // TODO check how many tickets are currently in the cart

        const availableTickets = Ticket.getAvailableTickets(data);
        for (const ticket of availableTickets) {
            try {
                // TODO improve the amount of tickets that should be bought
                if (await Ticket.buyTicket(token, ticket)) {

                    setTimeout(loop, 5000);
                    return
                }
            } catch (err) {
                console.error(err)
            }

        }
        if (availableTickets.length === 0) {
            console.log(new Date(), 'No tickets')
        }
        setTimeout(loop, 500)
    }

    loop()
}
