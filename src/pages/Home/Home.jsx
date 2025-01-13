import { Button } from "@/components/ui/button";

const Home = () => {
    return (
        <div>
            <main className="p-4">
                <h1 className="text-4xl font-poppins text-primary">
                    Welcome to NewsSphere!
                </h1>
                <p className="text-lg font-poppins">
                    Explore trending articles and stay updated with premium
                    features. Join now!
                </p>
                <Button className="rounded-full">Get Started</Button>
            </main>
        </div>
    );
};

export default Home;
