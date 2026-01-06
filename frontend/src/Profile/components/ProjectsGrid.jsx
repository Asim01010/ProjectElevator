import Project from "./Project"; // Assuming Project component is in the same directory

const ProjectsGrid = () => {
  // Sample project data - in real app, this would come from an API or props
  const projects = [
    {
      id: 1,
      name: "elevator_2",
      progress: 75,
      lastEdited: "Today",
      color: "green",
    },
    {
      id: 2,
      name: "office_tower",
      progress: 45,
      lastEdited: "2 days ago",
      color: "blue",
    },
    {
      id: 3,
      name: "mall_project",
      progress: 90,
      lastEdited: "Yesterday",
      color: "purple",
    },
    {
      id: 4,
      name: "hospital_lift",
      progress: 30,
      lastEdited: "1 week ago",
      color: "red",
    },
    {
      id: 5,
      name: "residential_a",
      progress: 60,
      lastEdited: "3 days ago",
      color: "yellow",
    },
    {
      id: 6,
      name: "complex_b",
      progress: 85,
      lastEdited: "Today",
      color: "indigo",
    },
    {
      id: 7,
      name: "hotel_renovation",
      progress: 20,
      lastEdited: "2 weeks ago",
      color: "pink",
    },
    {
      id: 8,
      name: "premium_suite",
      progress: 95,
      lastEdited: "Yesterday",
      color: "teal",
    },
    {
      id: 9,
      name: "standard_elevator",
      progress: 50,
      lastEdited: "5 days ago",
      color: "orange",
    },
    {
      id: 10,
      name: "luxury_lift",
      progress: 100,
      lastEdited: "Today",
      color: "cyan",
    },
    {
      id: 11,
      name: "industrial_project",
      progress: 65,
      lastEdited: "4 days ago",
      color: "rose",
    },
    {
      id: 12,
      name: "public_transport",
      progress: 40,
      lastEdited: "1 week ago",
      color: "violet",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-light text-gray-800 tracking-wide mb-2">
          My Projects
        </h1>
        <p className="text-gray-500 font-light tracking-wide">
          Manage all your elevator design projects from one dashboard
        </p>

        {/* Stats Bar */}
        <div className="flex flex-wrap items-center gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-400"></div>
            <span className="text-sm font-light text-gray-600">
              Active: 8 projects
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-400"></div>
            <span className="text-sm font-light text-gray-600">
              In Progress: 4 projects
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-gray-400"></div>
            <span className="text-sm font-light text-gray-600">
              Completed: 1 project
            </span>
          </div>
        </div>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-fr">
        {projects.map((project) => (
          <div key={project.id} className="h-full">
            <Project />
          </div>
        ))}
      </div>

      {/* Pagination/Footer */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm font-light text-gray-500">
            Showing {projects.length} of {projects.length} projects
          </div>

          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-sm font-light text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-light text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              1
            </button>
            <button className="px-4 py-2 text-sm font-light text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-4 py-2 text-sm font-light text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-4 py-2 text-sm font-light text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
    