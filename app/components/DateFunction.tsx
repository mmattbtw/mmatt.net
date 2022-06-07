export default function DateFunction({ date }: { date: Date }) {
    return `${new Date(date).toLocaleDateString()} - ${new Date(date).toLocaleTimeString()}`;
}
