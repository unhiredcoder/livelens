"use client";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export default function ImagePreviewCard({
    image,
    removeCall,
}: {
    image: string;
    removeCall: () => void;
}) {
    return (
            <div
                className="w-4/4 ml-14 h-72 rounded-lg bg-cover"
                style={{
                    backgroundImage: `url(${image})`,
                    backgroundRepeat: "no-repeat",
                    objectFit: "contain",
                }}
            >
                <div className="text-right mr-2">
                    <Button size="icon" className="mt-2" onClick={removeCall}>
                        <X />
                    </Button>
            </div>
        </div>
    );
}