import ElementCard from "../../components/ElementCard";

const Earth = () => {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Malphite_0.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {/* Hero Section */}
            <section className="relative py-20 px-4 bg-white bg-opacity-70">
                <div className="absolute inset-0 opacity-50"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Earth Element</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The Earth element symbolizes stability, nourishment, and grounding. It represents practicality and reliability, providing a solid foundation for growth and development. In Feng Shui, Earth enhances feelings of security and well-being, fostering balance in one's life.
                    </p>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="py-20 px-4 bg-white bg-opacity-70">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Characteristics of Earth</h2>
                    <p className="text-lg mb-4">
                        Earth represents stability and nurturing. Individuals aligned with the Earth element are often dependable, patient, and capable of creating harmony in their environments. They tend to be grounded and practical in their approach to life.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Feng Shui Applications:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Incorporate earthy colors (brown, beige, ochre) to promote stability and security.</li>
                        <li>Use crystals and natural elements to create a calming and grounding atmosphere.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Earth;
