export function buildUSDateFromTimestamp(timestamp: number): string {
    // Imperative programming.
    // A better solution can be achieved 

    const fill = (t: string) => {
        if (t.length === 1) {
            return `0${t}`;
        }
        return t;
    }
    const date = new Date(timestamp);
    const day = fill(date.getDate().toString());
    const month = fill((date.getMonth() + 1).toString());
    const hour = fill(date.getHours().toString());
    const minutes = fill(date.getMinutes().toString());
    const seconds = fill(date.getMinutes().toString());
    const fullYear = date.getFullYear();
    return `${month}/${day}/${fullYear} ${hour}:${minutes}:${seconds}`;
}