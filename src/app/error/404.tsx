import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <>
      {/* Main 404 Section */}
      <section className="bg-[#F6F5FF] py-6 md:py-10">
        <div className="container mx-auto flex flex-col items-center md:items-start justify-center gap-2 px-4 md:px-8">
          <h1 className="text-[#101750] text-3xl md:text-4xl font-bold text-center md:text-left">
            404 Not Found
          </h1>
          <div className="flex items-center gap-2 text-sm md:text-base font-medium text-center md:text-left">
            <Link href="/" className="hover:text-[#FB2E86]">Home</Link>
            <span className="text-gray-400">.</span>
            <p>Pages</p>
            <span className="text-gray-400">.</span>
            <p className="text-[#FB2E86]">404 Not Found</p>
          </div>
        </div>
      </section>

      {/* Image & Back to Home Button - Now Closer to Main Section */}
      <section className="flex flex-col items-center justify-center bg-white px-4 gap-y-4">
        <div className="max-w-md w-full text-center">
          <Image
            src="/pages-images/notfound404.png"
            alt="404"
            width={700}
            height={700}
            className="w-full h-auto"
          />
          <Link href="/">
            <button className="mt-4 px-6 py-3 bg-[#FB2E86] text-white font-medium rounded-md shadow-md hover:bg-red-600">
              Back To Home
            </button>
          </Link>
        </div>
      </section>

      {/* Tag Image - Now Closer to Content */}
      <div className="flex justify-center items-center mt-4 px-4">
        <Image
          src="/tagpic.png"
          alt="tagpic"
          width={908}
          height={93}
          className="cursor-pointer w-full max-w-4xl"
        />
      </div>
    </>
  );
};

export default Error;
