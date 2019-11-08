// TODO Fix Node

function getAttribute(node: any, id: string): string {
  if (node.attributes[id]) return node.attributes[id].value;
  return getAttribute(node.parentNode, id);
}
export default getAttribute;
