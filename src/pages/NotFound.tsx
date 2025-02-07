import { Link } from "react-router";

export default function NotFound() {
  return (
    <>
        <section className="flex flex-col items-center justify-center text-center h-screen">
            <h1>Error 404</h1>
             <span>The page you are looking for does not exist</span>

            <Link to="/" className="bg-white text-slate-900 py-2 px-10 hover:text-slate-900 transition-all duration-150"> &larr; Back to homepage</Link>
        </section>
    </>
  )
}
