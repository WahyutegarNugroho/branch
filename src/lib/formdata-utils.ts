type FormDataTransform = (value: string) => unknown

export function formDataToObject(
  formData: FormData,
  transforms: Record<string, FormDataTransform> = {}
): Record<string, unknown> {
  const obj: Record<string, unknown> = {}
  for (const [key, value] of formData.entries()) {
    const str = typeof value === 'string' ? value : value.name
    obj[key] = transforms[key] ? transforms[key](str) : str
  }
  return obj
}
