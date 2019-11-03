function getProgramArguments() {
    const args = process.argv.slice(2);
    const invalidArgumentMessage = `Invalid arguments.
        Call with <URL_TO_EVENT> <TOKEN> [cluster mode=true|false]
        Example: ticketswapper https://www.ticketswap.com/event/museumnacht-amsterdam-2019/6135485a-7ccd-470d-b2ba-61ba58726a92 NlG3kR3lR3khNkRGwZi3TThNzINjkNwN22R2lTj2lGINNhEjNTZETITwIi3izkzTjTZkIkkZiETiEkwhGTz3z23h3Z33
        Example: ticketswapper https://www.ticketswap.com/event/museumnacht-amsterdam-2019/6135485a-7ccd-470d-b2ba-61ba58726a92 NlG3kR3lR3khNkRGwZi3TThNzINjkNwN22R2lTj2lGINNhEjNTZETITwIi3izkzTjTZkIkkZiETiEkwhGTz3z23h3Z33 true
        `

    if (args.length !== 2 && args.length !== 3) {
        console.error(invalidArgumentMessage)
        process.exit(1);
    }

    const [url, token, clusterMode] = args;
    if (!url.startsWith('http')) {
        console.error(invalidArgumentMessage)
        process.exit(1);
    }


    return {url, token: `Bearer ${token}`, clusterMode: clusterMode === 'true'}
}

export const Utils = {
    getProgramArguments
}
