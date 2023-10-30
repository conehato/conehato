export default function NotFound() {
  return (
    <div className="flex min-h-full justify-center items-center">
      <div className="flex flex-col items-center gap-12">
        <h1 className="flex text-9xl font-bold">404</h1>

        <div className="text-xl text-slate-400 max-w-xl text-center">
          {`The page you are looking for doesn't exist or has been moved. Please go back to the homepage.`}
        </div>
      </div>
    </div>
  );
}
