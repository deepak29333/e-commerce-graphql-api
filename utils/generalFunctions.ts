export function getSelectedFields(info: any) {
  return info.fieldNodes[0].selectionSet?.selections.map((selection: any) => selection.name.value);
}