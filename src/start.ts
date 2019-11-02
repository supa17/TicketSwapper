import {Event} from "./event";
import {Ticket} from "./ticket";

export async function start(url: string, token: string) {
    const eventId = await Event.getEventIdFromURL(url);

    async function loop() {
        const data = await Event.getData(eventId)

        const availableTickets = Ticket.getAvailableTickets(data);
        for (const ticket of availableTickets) {
            try {
                if (await Ticket.buyTicket(token, ticket)) {

                    setTimeout(loop, 60000);
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
