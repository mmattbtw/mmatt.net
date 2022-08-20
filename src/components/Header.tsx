import { useEffect, useState } from "react";

export default function Header(props: {
  links: {
    title: string;
    href: string;
  }[];
}) {
  const [isAtTop, setIsAtTop] = useState(true);

  // Credit: @spacedriveapp 2022
  // https://github.com/spacedriveapp/spacedrive/blob/151920dd6f8f3f663b18531f30a6e9b4599427cb/apps/landing/src/components/NavBar.tsx#L47-L57

  function onScroll() {
    if ((window.pageYOffset || 0) < 20) setIsAtTop(true);
    else if (isAtTop) setIsAtTop(false);
  }

  useEffect(() => {
    if (!window) return;
    setTimeout(onScroll, 0);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textHover =
    "hover:text-blue-300 hover:bg-neutral-800 rounded pt-2 pb-2 pr-2 pl-2";

  return (
    <div
      className={
        "sticky top-0 flex items-center justify-between flex-row p-5 backdrop-blur-lg w-full mb-10 z-10 max-h-16 transition-all border-b-2 border-b-neutral-900" +
        " " +
        (isAtTop ? `bg-transparent` : `bg-neutral-800/50`)
      }
    >
      <h1 className="text-xl font-bold">mmatt.net</h1>
      <div className="flex flex-row gap-9 mr-5">
        {props.links.map((link) => (
          <a key={link.href} href={link.href} className={textHover}>
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}