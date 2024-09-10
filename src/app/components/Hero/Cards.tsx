import Image from "next/image";

const cardsData = [
    {
        id: 1,
        imageSrc: "/img1.jpeg",
        title: "Explore the Mountains",
        description: "Discover the beauty of Oman's majestic mountains.",
        buttonText: "Learn More",
    },
    {
        id: 2,
        imageSrc: "/img2.jpeg",
        title: "Relax at the Beach",
        description: "Experience the serene and pristine beaches.",
        buttonText: "View Beaches",
    },
    {
        id: 3,
        imageSrc: "/img3.jpeg",
        title: "Visit Historic Forts",
        description: "Explore the rich history and architecture.",
        buttonText: "Explore Forts",
    },
];

export default function CardSection() {
    return (
        <div className="p-4 md:p-8 lg:p-12 ">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cardsData.map(card => (
                    <div
                        key={card.id}
                        className="rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
                    >
                        <div className="relative w-full h-56">
                            <Image
                                src={card.imageSrc}
                                alt={card.title}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-t-lg"
                            />
                        </div>
                        <div className="p-4 bg-white text-center">
                            <h2 className="text-xl font-bold mb-2">{card.title}</h2>
                            <p className="text-gray-700 mb-4">{card.description}</p>
                            <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700">
                                {card.buttonText}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
