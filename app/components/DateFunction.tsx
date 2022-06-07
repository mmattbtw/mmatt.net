export default function PrettyDate(date: Date) {
    return `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`;
}
