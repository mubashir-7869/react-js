import React, { useEffect,} from "react";
import PropTypes from "prop-types";
import feather from "feather-icons";
import $ from "jquery";

const Layout = ({ children }) => {
  
  useEffect(() => {
    $(document).ready(function () {
      $(".scroll-link").on("click", function (event) {
        event.preventDefault();
        const sectionID = $(this).attr("data-id");

        console.log("sectionID:", sectionID);

        if (sectionID) {
          scrollToID("#" + sectionID, 1000);
        } else {
          console.error("Missing data-id attribute for scroll link.");
        }
      });

      $(".scroll-top").on("click", function (event) {
        event.preventDefault();
        $("html, body").animate({ scrollTop: 0 }, "slow");
      });

      $("#nav-toggle").on("click", function (event) {
        event.preventDefault();
        $("#main-nav").toggleClass("open");
      });
      feather.replace();
    });

    // Function to handle smooth scrolling
    function scrollToID(id, speed) {
      var offSet = 50;
      var $target = $(id);

      if ($target.length) {
        var targetOffset = $target.offset().top - offSet;
        var mainNav = $("#main-nav");
        $("html, body").animate({ scrollTop: targetOffset }, speed);

        if (mainNav.hasClass("open")) {
          mainNav.css("height", "1px").removeClass("in").addClass("collapse");
          mainNav.removeClass("open");
        }
      } else {
        console.error(`Element with id "${id}" not found.`);
      }
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="content">
      <body>
        <div>{children}</div>
      </body>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  headerScripts: PropTypes.array,
  additionalScripts: PropTypes.array,
};

export default Layout;
