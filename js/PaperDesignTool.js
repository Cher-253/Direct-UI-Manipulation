(function() {
  window.PaperDesignTool = (function() {
    function PaperDesignTool(ops) {
      console.log("Paperjs Functionality");
      this.name = "design";
      this.setup(ops);
    }
    PaperDesignTool.prototype.setup = function(ops) {
      var canvas;
      canvas = ops.canvas[0];
      $(canvas).attr('width', ops.canvas.width()).attr('height', ops.canvas.height());
      window.paper = new paper.PaperScope;
      loadCustomLibraries();
      paper.setup(canvas);
      paper.view.zoom = 1.0;
      paper.tool = new paper.Tool({
        name: "default_tool"
      });
      console.log("\t", "Setup canvas", ops.canvas.width(), "x", ops.canvas.height());
      return this.toolEvents();
    };
    PaperDesignTool.prototype.toolEvents = function() {
      $("button#download-svg").click(function(){ window.tool.save_svg() })
    };
    PaperDesignTool.prototype.save_svg = function() {
      var bg, exp, g, prev, prior;
      prev = paper.view.zoom;
      console.log("Exporting file as SVG");
      paper.view.zoom = 1;
      paper.view.update();
        exp = paper.project.exportSVG({
          asString: true,
          precision: 5
        });
      saveAs(new Blob([exp], {
        type: "application/svg+xml"
      }), this.name + ".svg");
      return paper.view.zoom = prev;
    };
    PaperDesignTool.prototype.clear = function() {
      return paper.project.clear();
    };
    return PaperDesignTool;
  })();
}).call(this);