import Link from 'next/link';

export default function ListingsPage() {
  const listings = [
    { id: 1, name: 'Listing 1' },
    { id: 2, name: 'Listing 2' },
    { id: 3, name: 'Listing 3' },
  ];

  return (
    <div className="flex flex-col m-auto items-center justify-center min-h-screen py-2">
        <h1 className="text-6xl font-bold">
          Your Listings
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {listings.map((listing) => (
            <Link href={`/listing/${listing.id}`} key={listing.id} className="p-6 mt-6 text-left border w-72 rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-2xl font-bold">{listing.name} →</h3>
                <p className="mt-4 text-xl">
                  Check out this listing!
                </p>
            </Link>
          ))}
        </div>
    </div>
  );
}