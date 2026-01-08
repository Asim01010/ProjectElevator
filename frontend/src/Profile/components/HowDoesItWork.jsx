import React from "react";
import Navbar from "../../components/Navbar";

const HowDoesItWork = () => {
  return (
    <>
   
      <div className="min-h-screen py-30 bg-gray-50 text-gray-800" style={{ paddingRight:"5rem", paddingLeft:"5rem" }}>
        {/* Header Section */}
        <div className="py-10 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-light text-gray-600 ">
              GETTING STARTED with the Elevator Design Studio (EDS) is easy. In
              10 simple steps, this tutorial will show you how to select your
              elevator interior configuration, apply materials and finishes,
              view your progress with realistic renderings, and manage your
              project from a single location.
            </h3>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 1 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-2 items-center">
              {/* Left: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  1 REGISTER TO GET STARTED
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    Register a user account to unlock the Elevator Design
                    Studio's powerful tools.
                  </p>
                  <p>
                    After logging in, you'll be redirected to my.EDS dashboard
                    comprised of your Elevator Design Studio projects, account
                    information, and navigation menus.
                  </p>
                  <p>
                    Getting started is easy: click the plus button and name your
                    project. Keep in mind; you can create multiple designs under
                    the same project name.
                  </p>
                  <p>
                    In the event you already have an EDS user account, you will
                    be prompted to import your legacy projects the first time
                    you log in. The import process is fast and easy and can be
                    completed at any time.
                  </p>
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="/how!.gif"
                  alt="Registration interface"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 2 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Elevator configuration options"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>

              {/* Right: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  2 CHOOSE YOUR CONFIGURATION
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    The EDS workspace is comprised of the menu progress bar,
                    configuration editor, and rendering.
                  </p>
                  <p>
                    To start building your elevator interior, select one of our
                    ten configurations. Each configuration can be selected with
                    a single or double-ended opening style.
                  </p>
                  <p>
                    When you're ready for the next step, click the green Next
                    button.
                  </p>
                  <p>
                    You can switch between elevator interior configurations or
                    opening style mid-design. However, with the exception of
                    switching from a single-ended to a double-ended door opening
                    style, the material selections you've made will not migrate
                    to your new configuration. You'll need to reselect your
                    materials.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 3 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  3 MAKE YOUR PANEL SELECTION
                </h2>
                <p className="font-light tracking-wide leading-relaxed text-gray-600">
                  Each elevator interior configuration comes with a unique wall
                  panel layout, segmented into groups (letters) and sub-panels
                  (numbers). You can select and deselect panels by clicking the
                  group and/or sub-panel(s) in the editor on the left or the
                  rendering on the right.
                </p>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Panel selection interface"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 4 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Material selection"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>

              {/* Right: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  4 APPLY MATERIALS
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    Within the editor, you can search our standard inset
                    materials, apply finishes and patterns, view F+S favorites,
                    or save your library of favorites for future use. If
                    available for your panel selection, you may find the option
                    to apply a "Custom" swatch to indicate a third party
                    material.
                  </p>
                  <p>Visualize your material selections by clicking APPLY.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 5 - Missing in content, adding placeholder */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  5 SELECT FLOORING
                </h2>
                <p className="font-light tracking-wide leading-relaxed text-gray-600">
                  Choose from a variety of flooring options including marble,
                  tile, wood, and laminate. Each flooring type comes with
                  multiple color and texture variations to match your design.
                </p>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Flooring options"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 6 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Ceiling selection"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>

              {/* Right: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  6 SELECT A CEILING
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    Ceilings may be specified with one of several lighting
                    configurations, light temperature, materials, and finishes.
                    To apply, click on the ceiling configuration of your choice.
                  </p>
                  <p>
                    At this stage, you're able to pick a flooring option shown
                    for visual reference only.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 7 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  7 VIEWING OPTIONS
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    Now that you are nearly done designing your elevator
                    interior, why not review it from different angles? Just
                    click on any view options icon to the right of your
                    rendering to open it in a spotlight window.
                  </p>
                  <p>You can download each view as a single image.</p>
                </div>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="View options interface"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 8 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Design review interface"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>

              {/* Right: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  8 REVIEW YOUR DESIGN
                </h2>
                <div className="space-y-4 font-light tracking-wide leading-relaxed text-gray-600">
                  <p>
                    Your elevator interior is complete! Feel free to provide
                    additional details in the blank fields found in the editor.
                  </p>
                  <p>
                    Dimensions are needed to submit an advanced download
                    request. Advanced download documents include an EDS overview
                    PDF with weight estimation and the elevator interior design
                    CSI specs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 9 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  9 DOWNLOAD
                </h2>
                <p className="font-light tracking-wide leading-relaxed text-gray-600">
                  EDS designs can be downloaded as a comprehensive PDF or single
                  image for easy reference and sharing.
                </p>
              </div>

              {/* Right: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Download options"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="border-t border-gray-300" />

        {/* Step 10 */}
        <div className="min-h-[80vh] flex items-center py-10 px-32 md:px-20 sm:px-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              {/* Left: Image */}
              <div className="flex justify-center">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Project management interface"
                  className="w-full max-w-lg shadow-lg"
                />
              </div>

              {/* Right: Paragraph */}
              <div>
                <h2 className="text-2xl font-light text-gray-700 mb-8 tracking-wide">
                  10 GO TO PROJECT
                </h2>
                <p className="font-light tracking-wide leading-relaxed text-gray-600">
                  Create multiple elevator interior designs and link them to one
                  project to easily manage your information from a single
                  location.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowDoesItWork;
