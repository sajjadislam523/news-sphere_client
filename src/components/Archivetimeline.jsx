const Archivetimeline = () => {
    const years = [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023];

    return (
        <section className="p-8 my-4 ">
            <div className="mx-auto md:w-4/5 lg:w-3/5">
                <h2 className="mb-2 text-2xl font-bold text-center text-gray-900 font-merriweather">
                    Decade of Journalism
                </h2>
                {/* Short descriptive text */}
                <p className="mb-6 text-center text-gray-700 font-poppins">
                    Explore some of the most impactful stories we covered each
                    year, shaping a decade of trusted reporting and insightful
                    journalism.
                </p>
            </div>

            <div className="relative">
                {/* Horizontal scroll with snap */}
                <div className="flex pb-4 space-x-4 overflow-x-auto snap-x snap-mandatory">
                    {years.map((year) => (
                        <div
                            key={year}
                            className="flex-shrink-0 w-48 p-4 transition-transform duration-300 bg-white rounded-lg shadow-sm snap-start hover:scale-105 hover:shadow-md"
                        >
                            <h3 className="text-lg font-medium text-gray-900">
                                {year}
                            </h3>
                            <p className="mt-2 text-sm text-gray-600">
                                Landmark stories from {year}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Archivetimeline;
