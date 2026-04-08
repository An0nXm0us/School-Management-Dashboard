//01:18:55
const Announcements = () => {
    return (
        <div className="bg-white p-4 rounded-md">
            <div className="flex items-center justify-between">
                <h1 className="text-xl font-semibold">Announcements</h1>
                <span className="text-xs text-gray-400">View All</span>
            </div>
            <div className="flex flex-col gap-4 mt-4">
            <div className="bg-skyBlue rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">New School Policy Update</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                        2026-04-08
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Please review the updated school policies and their implementation timeline.
                </p>
            </div>

            <div className="bg-lightPurple rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">New School Policy Update</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                        2026-04-07
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Please review the updated school policies and their implementation timeline.
                </p>
            </div>

            <div className="bg-lightYellow rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h2 className="font-medium">New School Policy Update</h2>
                    <span className="text-xs text-gray-400 bg-white rounded-md px-1 py-1">
                        2026-04-07
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">
                    Please review the updated school policies and their implementation timeline.
                </p>
            </div>
        </div>
        </div>
    )
}

export default Announcements