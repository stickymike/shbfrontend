function getInnerText(e: any): string {
  if (!e.innerText) return getInnerText(e.parentElement);
  return e.innerText;
}

export default getInnerText;
