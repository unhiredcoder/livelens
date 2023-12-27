import { bytesToMB } from "@/lib/utils";

export function ImageValidator(
  name: string | undefined,
  size: number | undefined
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
      const imgExtType: Array<string> = ["svg", "png", "jpeg", "jpg","gif"];
      if (!imgExtType.includes(imgExt)) {
        flag = "Image must be .png, .jpeg, .jpg, .svg";
      }
    }
  }

  if (size) {
    const fileInMB = bytesToMB(size!);
    if (fileInMB > 4) {
      flag = "Image should be less than 4 MB.";
    }
  }

  return flag;
}


