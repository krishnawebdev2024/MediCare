import React from "react";

const SocialLinks = () => {
  const socialMediaLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/radhakrishnan-fullstackdeveloper",
    },
    { name: "Instagram", url: "https://www.instagram.com/krishnasivapalanrk/" },
    { name: "Twitter", url: "https://x.com/KrischWebdev" },
  ];

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="text-sm  gap-8 text-slate-400 flex flex-row">
      {socialMediaLinks.map((link, index) => (
        <button
          key={index}
          onClick={() => openLink(link.url)}
          className="block underline hover:text-slate-100 transition duration-200 text-left"
        >
          {link.name}
        </button>
      ))}
    </div>
  );
};

export default SocialLinks;
