export default function PrettyDate(date: Date | string) {
    return `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`;
}
