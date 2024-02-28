import Spinner from '../spinner'

export default function ActionButton(params: any) {
    return (
        <div className="pointer-none flex justify-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            {params?.loading ? (
                <Spinner />
            ) : (
                <button
                    type="button"
                    className="text-blue-700 hover:text-white border border-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2
    "
                    onClick={params?.func}
                >
                    {params?.title}
                </button>
            )}
        </div>
    )
}
