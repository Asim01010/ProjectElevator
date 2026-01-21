import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import {
  addSubproject,
  deleteProject,
  duplicateProject,
  getProjectById,
  projectReset,
} from "../redux/features/Project/projectSlice";
import { IoAddCircleOutline, IoCopyOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import SubProjectDetail from "./SubProjectDetail";

const ProjectDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    currentProject,
    projectLoading,
    projectError,
    projectMessage,
    projectSuccess,
  } = useSelector((state) => state.project);

  useEffect(() => {
    if (id) {
      dispatch(getProjectById(id));
    }
    return () => {
      dispatch(projectReset());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (projectSuccess && projectMessage?.includes("deleted")) {
      toast.success("Project deleted");
      navigate("/profile");
      dispatch(projectReset());
    }
    if (projectSuccess && projectMessage?.includes("duplicated")) {
      toast.success("Project duplicated");
    }
    if (projectSuccess && projectMessage?.includes("added")) {
      toast.success("New design added");
      dispatch(getProjectById(id));
    }

    if (projectError) {
      toast.error(projectMessage || "Operation failed");
      dispatch(projectReset());
    }
  }, [projectSuccess, projectError, projectMessage, navigate, dispatch, id]);

  useEffect(() => {
    if (projectError) {
      toast.error(projectMessage || "Failed to load project");
    }
  }, [projectError, projectMessage, navigate]);

  if (projectLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Loading project...</p>
      </div>
    );
  }

  if (!currentProject && id) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-red-600">Project not found</p>
      </div>
    );
  }

  const projectName = currentProject?.name || "elevator_2";
  const company = currentProject?.company || "";
  const specifier = currentProject?.specifier || "";
  const jobLocation = currentProject?.jobLocation || "";
  const created = currentProject?.createdAt
    ? new Date(currentProject.createdAt).toLocaleString()
    : "N/A";
  const lastModified = currentProject?.updatedAt
    ? new Date(currentProject.updatedAt).toLocaleString()
    : "N/A";

  return (
    <section className="min-h-screen flex flex-col justify-start items-center py-24 border">
      <div className="w-[90%] lg:w-[70%]">
        {/* Header */}
        <h3 className="text-gray-500 text-lg mb-4">
          My Project | {projectName}
        </h3>

        {/* Main Card */}
        <div className="flex border bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full p-4">
            {/* Column 1 */}
            <div className="flex flex-col gap-2">
              <img
                src="/Howorks.jpg"
                alt="Elevator Preview"
                className="w-full object-cover"
              />

              <div className="grid grid-cols-1 gap-2 text-sm text-gray-500 text-[12px]">
                <button
                  onClick={() => {
                    dispatch(
                      addSubproject({
                        projectId: id,
                        subData: { elevatorName: "New Elevator" },
                      }),
                    );
                  }}
                  className="flex items-center hover:text-gray-900 underline cursor-pointer"
                >
                  <IoAddCircleOutline />
                  ADD ELEVATOR INTERIOR
                </button>

                <button
                  onClick={() => {
                    const newName = prompt(
                      "Enter name for duplicated project:",
                      `${projectName} (Copy)`,
                    );
                    if (newName && newName.trim()) {
                      dispatch(
                        duplicateProject({ id, newName: newName.trim() }),
                      );
                    }
                  }}
                  className="flex items-center hover:text-gray-900 underline cursor-pointer"
                >
                  <IoCopyOutline /> DUPLICATE PROJECT
                </button>

                <button
                  onClick={() => {
                    if (
                      window.confirm(
                        "Delete this project and all its designs? This cannot be undone.",
                      )
                    ) {
                      dispatch(deleteProject(id));
                    }
                  }}
                  className="flex items-center hover:text-gray-900 underline cursor-pointer"
                >
                  <MdDeleteForever /> DELETE PROJECT
                </button>
              </div>
            </div>

            {/* Column 2 & 3 */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <p className="text-gray-600 text-[12px] leading-relaxed">
                Within a project you can create multiple elevator interior
                designs. You can continue modifying them individually until you
                request an 'Advanced Download'. To ensure data accuracy, your
                design will stay locked until your request is processed. Note
                that you can only request 'Advanced Download' for individual
                elevator interiors with a 'Complete' status within a project.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 uppercase">
                {/* Form */}
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Project Name:
                    </label>
                    <input
                      type="text"
                      defaultValue={projectName}
                      className="w-full sm:w-[60%] outline-none border border-gray-500"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Company:
                    </label>
                    <input
                      type="text"
                      defaultValue={company}
                      className="w-full sm:w-[60%] outline-none border border-gray-500"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Specifier:
                    </label>
                    <input
                      type="text"
                      defaultValue={specifier}
                      className="w-full sm:w-[60%] outline-none border border-gray-500"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Job Location:
                    </label>
                    <textarea
                      defaultValue={jobLocation}
                      className="w-full sm:w-[60%] outline-none border border-gray-500"
                    />
                  </div>
                </div>

                {/* Dates */}
                <div className="flex flex-col justify-start gap-2">
                  <div className="flex items-center justify-between">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Created:
                    </label>
                    <p className="text-[10px]">{created}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <label className="text-gray-600 text-[12px] font-semibold whitespace-nowrap">
                      Last Modified:
                    </label>
                    <p className="text-[10px]">{lastModified}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub projects */}
      {currentProject?.subprojects?.map((sub) => (
        <SubProjectDetail key={sub._id} subproject={sub} projectId={id} />
      ))}
    </section>
  );
};

export default ProjectDetail;
