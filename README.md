# TicketSwapper

A bot for https://ticketswap.nl/. It adds tickets for an event to the cart.

## DISCLAIMER

Using the script might get you banned from Ticketswap (usage of a bot is against the terms and conditions). Please use it with your own risk.

## Install

`npm install -g ticketswapper`

## How to run

Run with:

```shell script
ticketswapper <URL_TO_EVENT> <TOKEN> [cluster mode=true|false]
```

### URL
The URL of the event can be the full URL.

### Token
The token is the identifier for the session with TicketSwap and it needs to be extracted from the browser.
Open the TicketSwap website and login. Open the developer tools of your browser and take a look at the network calls. In the requests it is part of the request headers.

When copying the token, just copy the part after `Bearer <token>`.

If that is unclear, please check out the following website. It shows the network tab and headers in Chrome.
https://commandlinefanatic.com/cgi-bin/showarticle.cgi?article=art034



### Cluster mode

Cluster mode will start the application multiple times on the computer. It will open multiple connections to Ticket Swap.

## Examples

Example for an event:

```shell script
ticketswapper https://www.ticketswap.com/event/museumnacht-amsterdam-2019/6135485a-7ccd-470d-b2ba-61ba58726a92 NlG3kR3lR3khNkRGwZi3TThNzINjkNwN22R2lTj2lGINNhEjNTZETITwIi3izkzTjTZkIkkZiETiEkwhGTz3z23h3Z33
```

Another example with cluster mode.

```shell script
ticketswapper https://www.ticketswap.com/event/museumnacht-amsterdam-2019/6135485a-7ccd-470d-b2ba-61ba58726a92 NlG3kR3lR3khNkRGwZi3TThNzINjkNwN22R2lTj2lGINNhEjNTZETITwIi3izkzTjTZkIkkZiETiEkwhGTz3z23h3Z33 true
```

