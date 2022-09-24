import { useEffect, useState } from "preact/hooks";

export default function Header(props: {
  links: {
    title: string;
    href: string;
  }[];
  disableHeaderOnScroll: boolean;
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
    "dark:hover:text-blue-300 dark:hover:bg-neutral-800 hover:text-blue-700 hover:bg-neutral-200 rounded pt-2 pb-2 pr-2 pl-2 transition-all md:text-lg text-xs";

  return (
    <div
      className={
        (props.disableHeaderOnScroll ? `static` : `sticky`) +
        " " +
        "top-0 flex items-center justify-between flex-row p-5 backdrop-blur-lg w-full mb-10 z-10 max-h-16 transition-all border-b-2 border-b-neutral-900" +
        " " +
        (isAtTop ? `bg-transparent` : `dark:bg-neutral-800/50 bg-white/50`)
      }
    >
      <a href="/">
        <h1 className="text-xl font-bold">mmatt.net</h1>
      </a>
      <div className="flex flex-row gap-2 md:gap-5 mr-5">
        {props.links.map((link) => (
          <a key={link.href} href={link.href} className={textHover}>
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
}
