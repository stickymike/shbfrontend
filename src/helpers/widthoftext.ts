function getWidthOfText(
  txt: string,
  fontsize = "16px",
  fontname = "Roboto"
): number {
  //TODO Any Fix
  const helper: any = {};
  if (helper.c === undefined) {
    helper.c = document.createElement("canvas");
    helper.ctx = helper.c.getContext("2d");
  }
  helper.ctx.font = fontsize + " " + fontname;
  return helper.ctx.measureText(txt).width;
}
export default getWidthOfText;
