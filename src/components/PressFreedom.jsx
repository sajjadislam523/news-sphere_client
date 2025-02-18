const PressFreedom = () => {
    return (
        <div className="p-8 bg-white border-t">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="mb-4 text-2xl font-bold text-gray-900 font-merriweather">
                    Defending Press Freedom
                </h2>
                <p className="mb-6 text-gray-700 font-poppins">
                    &quot;We stand with journalists worldwide facing censorship.
                    Explore resources to support free press:&quot;
                </p>
                <div className="flex justify-center gap-4">
                    <a
                        href="/press-freedom"
                        className="px-6 py-2 font-medium text-gray-900 bg-transparent border border-gray-900 rounded-lg hover:bg-gray-100"
                    >
                        Learn More
                    </a>
                    <a
                        href="/report-censorship"
                        className="px-6 py-2 font-medium text-white bg-gray-900 rounded-lg hover:bg-gray-800"
                    >
                        Report Incident
                    </a>
                </div>
            </div>
        </div>
    );
};

export default PressFreedom;
