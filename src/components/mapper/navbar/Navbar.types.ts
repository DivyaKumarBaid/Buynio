export type NavbarProps = {
    background: string;
    headerFontColor: string;
    linkFontColor: string;
    isSticky: boolean;
    links: {link: string, redirection: string}[];
    brandName: string;
    logo: string;
    logoSize: number;
    logoVisibility: boolean;
    headerVisibility: boolean;
  };