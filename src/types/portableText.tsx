/* eslint-disable @typescript-eslint/no-explicit-any */
import Image from "next/image";

export const portableTextComponents = {
    types: {
        image: ({ value }: any) => (
            <div className="my-8">
                <Image src={value.asset.url} alt={value.alt || "Blog image"} width={1200} height={800} className="rounded-2xl" />
                {value.caption && <p className="text-sm text-gray-500 text-center mt-2 italic">{value.caption}</p>}
            </div>
        ),
    },
    block: {
        h2: ({ children }: any) => <h2 className="text-3xl font-bold text-gray-900 mt-12 mb-4">{children}</h2>,
        h3: ({ children }: any) => <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-3">{children}</h3>,
        blockquote: ({ children }: any) => <blockquote className="border-l-4 border-pink-500 pl-6 py-2 my-6 italic text-gray-700 bg-pink-50 rounded-r-lg">{children}</blockquote>,
        normal: ({ children }: any) => <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>,
    },
    marks: {
        link: ({ children, value }: any) => (
            <a href={value.href} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-700 underline">
                {children}
            </a>
        ),
        strong: ({ children }: any) => <strong className="font-bold text-gray-900">{children}</strong>,
        em: ({ children }: any) => <em className="italic">{children}</em>,
    },
};