import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <section className="h-full text-center text-[#39FF14] p-10">
       <p className="text-4xl font-bold neon-text">Hello Lambda Remix!</p>
    </section>
  );
}