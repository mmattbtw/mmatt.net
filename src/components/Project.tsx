import { ReactNode } from "react";

export default function Project({
  name,
  link,
  date,
  byline,
  description,
}: {
  name: string;
  link: string;
  date: string;
  byline: string;
  description: ReactNode;
}) {
  return (
    <div className="outline rounded-lg p-2">
      <div>
        <h1 className="font-bold text-xl">
          <a href={link} className="underline">
            {name}
          </a>
        </h1>
        <h2 className="font-semibold">{date}</h2>
        <p>{byline}</p>
      </div>
      <hr className="mt-1 mb-1" />
      {description}
    </div>
  );
}
