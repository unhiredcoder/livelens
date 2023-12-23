
export function ImageValidator(
  name: string | undefined,
): string | null {
  let flag: string | null = null;

  if (name) {
    // Use lastIndexOf to find the last dot in the name
    const lastDotIndex = name.lastIndexOf(".");
    
    if (lastDotIndex === -1) {
      // No dot found in the name
      flag = "Image must have a valid extension.";
    } else {
      // Extract the extension using substring
      const imgExt = name.substring(lastDotIndex + 1).toLowerCase();
      
      const imgExtType: Array<string> = ["svg", "png", "jpeg", "jpg"];
      if (!imgExtType.includes(imgExt)) {
        flag = "Image must be .png, .jpeg, .jpg, .svg";
      } else {
        flag = null;
      }
    }
  }

  return flag;
}
