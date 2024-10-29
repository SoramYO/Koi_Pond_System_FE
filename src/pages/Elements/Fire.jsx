import ElementCard from "../../components/ElementCard";

const Fire = () => {
    return (
        <div
            className="min-h-screen font-sans relative overflow-hidden"
            style={{
                backgroundImage: "url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Brand_0.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >          {/* Hero Section */}
            <section className="relative py-20 px-4 bg-white bg-opacity-70">
                <div className="absolute inset-0 opacity-50"></div>
                <div className="relative z-10 text-center max-w-4xl mx-auto">
                    <h1 className="text-4xl font-bold text-gray-800 mb-6">Fire Element</h1>
                    <p className="text-lg text-gray-600 mb-8">
                        The Fire element represents passion, energy, and transformation. It embodies enthusiasm and creativity, inspiring individuals to take action and embrace change. In Feng Shui, Fire is associated with fame and recognition, encouraging individuals to shine brightly in their endeavors.
                    </p>
                </div>
            </section>

            {/* Detailed Information */}
            <section className="py-20 px-4 bg-white bg-opacity-70">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Characteristics of Fire</h2>
                    <p className="text-lg mb-4">
                        Fire symbolizes vitality and action. Those aligned with the Fire element are often charismatic, adventurous, and able to inspire others. However, they may also need to manage their intensity to avoid burnout.
                    </p>
                    <h3 className="text-xl font-semibold mb-2">Feng Shui Applications:</h3>
                    <ul className="list-disc list-inside mb-4">
                        <li>Incorporate red, orange, and purple colors to enhance energy and creativity in your space.</li>
                        <li>Use candles or fireplaces to stimulate passion and motivation.</li>
                    </ul>
                </div>
            </section>
        </div>
    );
}

export default Fire;
