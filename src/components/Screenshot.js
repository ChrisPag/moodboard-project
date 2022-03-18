import html2canvas from "html2canvas";

const Screenshot = async (element, imageFileName) => {
  const canvas = await html2canvas(element,{
    allowTaint: true,
    useCORS: true
  });
  const image = canvas.toDataURL("image/png", 1.0);
  download(image);
};

const download = (image, { name = "img", extension = ".jpg" } = {}) => {
  const a = document.createElement("a");
  a.href = image;
  a.download = name + extension;
  a.click();
};

export default Screenshot;