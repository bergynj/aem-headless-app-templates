import Image from 'next/image'
import Social from "@aem-headless/ui/Social";

export interface AvatarCardProps {
    imageUrl: string;
    name: string;
    role: string;
    social?: any; // Define more strictly if social structure is known
}

export default async function AvatarCard({imageUrl, name, role, social}: AvatarCardProps) {
    return (
        <div className="flex flex-col items-center">
            <Image
                className="h-80 w-80 md:h-40 md:w-40 mx-auto object-cover rounded-full"
                src={imageUrl} width={200} height={200} alt={"Portrait of " + name}/>
            <div className="text-center mt-3">
                <div className="font-bold">{name}</div>
                <div className="text-sm mt-3">{role}</div>
                <div className="mt-3"><Social/></div>
            </div>
        </div>
    )
}
