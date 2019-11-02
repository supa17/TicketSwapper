import {postRequest} from "./request";
import _ from "lodash";

export type EventData = any;

async function getData(eventId: string): Promise<EventData> {
    let result: any = await postRequest({
        url: "https://api.ticketswap.com/graphql/public/batch", body:
            [
                {
                    "operationName": "getEventData",
                    "variables": {
                        "id": eventId

                    },
                    "query": `
                    query getEventData($id: String!) {
  node(id: $id) {
    ... on Event {
      ...eventData
      __typename
    }
    ... on EventType {
      id
      title
      startDate
      endDate
      slug
      event {
        ... on Event {
          ...eventData
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}

fragment eventData on Event {
  __typename
  status
  id

  types(first: 99) {
    edges {
      node {
        id
        slug
        title
        startDate
        endDate
        availableTicketsCount
        availableListings(first: 5) {
          edges {
            node {
              id
              createdAt
              uri {
                path
                __typename
              }
              price {
                totalPriceWithTransactionFee {
                  currency
                  amount
                  __typename
                }
                __typename
              }
              __typename
            }
            __typename
          }
          __typename
        }
        uri {
          path
          __typename
        }
        __typename
      }
      __typename
    }
    __typename
  }
}
`
                }
            ]
    });
    result = JSON.parse(result)
    return result
}

function getEventIdsFromURL(url: string) {
    const rawId = getRawIdFromURL(url);

    console.log(`Found id: ${rawId}`)
    const eventType = Buffer.from(`EventType:${rawId}`).toString('base64')
    const eventId = Buffer.from(`Event:${rawId}`).toString('base64')
    return {eventId, eventType}
}

async function testEventId(id) {
    try {
        const data = await Event.getData(id)
        const result = _.get(data, '[0].data.node.id', null)
        return result === id;
    } catch (err) {
        console.error(`This should not have happened.`, err)
        return false
    }
}

async function getEventIdFromURL(url: string) {
    const {eventType, eventId} = getEventIdsFromURL(url)

    if (await testEventId(eventType)) {
        return eventType;
    }

    if (await testEventId(eventId)) {
        return eventId;
    }

    throw new Error('Event id could not be used.')
}

export const Event = {
    getData,
    testEventId,
    getEventIdFromURL
}


function getRawIdFromURL(url: string) {
    if (!url || url.trim().length === 0) {
        throw new Error(`
        URL is format is incorrect. Please specify ULR like:
        Like: 
        https://www.ticketswap.com/event/museumnacht-amsterdam-2019/regular-tickets/6135485a-7ccd-470d-b2ba-61ba58726a92/1450743
        OR
        https://www.ticketswap.com/event/museumnacht-amsterdam-2019/regular-tickets/6135485a-7ccd-470d-b2ba-61ba58726a92
        `)
    }
    const urlSplit = url.split('/')
    const rawId = urlSplit[urlSplit.length - 1]
    return rawId;
}
