"use client"

export default function cart() {
  const cartItems = [
    { id: 1, name: 'Game 1', price: '$99.99' },
    { id: 2, name: 'Game 2', price: '$79.99' },
    { id: 3, name: 'Game 3', price: '$59.99' },
  ];

  const removeItem = (id : any) => {
    console.log(`Remove item with id ${id}`);
  };

  const checkout = () => {
    console.log('Checkout');
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-9/12 flex-1 text-center">
        <h1 className="text-6xl font-bold">
          Your Cart
        </h1>

        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-6 mt-6 text-left border w-72 rounded-xl hover:text-blue-600 focus:text-blue-600"
            >
              <h3 className="text-2xl font-bold">{item.name} →</h3>
              <p className="mt-4 text-xl">
                Price: {item.price}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={checkout}
          className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </main>
    </div>
  );
}