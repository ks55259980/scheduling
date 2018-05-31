<template>
  <div ref="gantt"></div>
</template>

<script>
  import 'dhtmlx-gantt'
  import 'dhtmlx-gantt/codebase/ext/dhtmlxgantt_fullscreen.js'

  export default {
    name: 'gantt',
    props: {
      tasks: {
        type: Object,
        default () {
          return {data: [], links: []}
        }
      },
      config: {
        type: Object,
        default () {
          return {}
        }
      },
      baseline: {
        type: String,
        default: ''
      }
    },
    data () {
      return {
        data: []
      }
    },
    methods: {
      $_initGanttEvents: function () {
        if(gantt.$_eventsInitialized)
          return;
        gantt.attachEvent("onTaskLoading", function(task){
          task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date")
          task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date")
          return true
        });
        gantt.attachEvent('onTaskSelected', (id) => {
          let task = gantt.getTask(id)
          this.$emit('task-selected', task)
        })

        gantt.attachEvent('onAfterTaskAdd', (id, task) => {
          this.$emit('task-updated', id, 'inserted', task)
          task.progress = task.progress || 0
          if(gantt.getSelectedId() == id) {
            this.$emit('task-selected', task)
          }
        })

        gantt.attachEvent('onAfterTaskUpdate', (id, task) => {
          this.$emit('task-updated', id, 'updated', task)
        })

        gantt.attachEvent('onAfterTaskDelete', (id) => {
          this.$emit('task-updated', id, 'deleted')
          if(!gantt.getSelectedId()) {
            this.$emit('task-selected', null)
          }
        })

        gantt.attachEvent('onAfterLinkAdd', (id, link) => {
          this.$emit('link-updated', id, 'inserted', link)
        })

        gantt.attachEvent('onAfterLinkUpdate', (id, link) => {
          this.$emit('link-updated', id, 'updated', link)
        })

        gantt.attachEvent('onAfterLinkDelete', (id, link) => {
          this.$emit('link-updated', id, 'deleted')
        })
        gantt.attachEvent("onTemplatesReady", function () {
          var toggle = document.createElement("i")
          toggle.className = "fa fa-expand gantt-fullscreen"
          gantt.toggleIcon = toggle
          gantt.$container.appendChild(toggle)
          let ganttWrapper = gantt.$container.parentNode
          console.log(gantt.$container.parentNode)
          toggle.onclick = function () {
            if (!gantt.getState().fullscreen) {
              ganttWrapper.style.zIndex = 9999
              gantt.expand()
            }
            else {
              gantt.collapse()
            }
          }
        })
        gantt.attachEvent("onExpand", function () {
          var icon = gantt.toggleIcon
          if (icon) {
            icon.className = icon.className.replace("fa-expand", "fa-compress")
          }

        })
        gantt.attachEvent("onCollapse", function () {
          var icon = gantt.toggleIcon
          if (icon) {
            icon.className = icon.className.replace("fa-compress", "fa-expand")
          }
        })
        gantt.addTaskLayer(function draw_planned(task) {
          if (task.planned_start && task.planned_end) {
            var sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end)
            var el = document.createElement('div')
            el.className = 'baseline'
            el.style.left = sizes.left + 'px'
            el.style.width = sizes.width + 'px'
            el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px'
            return el
          }
          return false
        })
        gantt.$_eventsInitialized = true
      },
      clearAll () {
        gantt.clearAll()
      },
      parse (data) {
        gantt.parse(data)
      },
      getTaskFitValue (task) {
        var taskStartPos = gantt.posFromDate(task.start_date),
          taskEndPos = gantt.posFromDate(task.end_date)

        var width = taskEndPos - taskStartPos
        var textWidth = (task.text || "").length * gantt.config.font_width_ratio

        if (width < textWidth) {
          var ganttLastDate = gantt.getState().max_date
          var ganttEndPos = gantt.posFromDate(ganttLastDate)
          if (ganttEndPos - taskEndPos < textWidth) {
            return "left"
          }
          else {
            return "right"
          }
        }
        else {
          return "center"
        }
      }
    },

    mounted () {
      let that = this
      this.$_initGanttEvents()
      for (let key in this.config) {
        gantt.config[key] = this.config[key]
      }
      gantt.config.font_width_ratio = 7
      gantt.templates.leftside_text = function leftSideTextTemplate(start, end, task) {
        if (that.getTaskFitValue(task) === "left") {
          return task.text
        }
        return ""
      }
      gantt.templates.rightside_text = function rightSideTextTemplate(start, end, task) {
        if (that.getTaskFitValue(task) === "right") {
          return task.text
        }
        return ""
      }
      gantt.templates.task_text = function taskTextTemplate(start, end, task) {
        if (that.getTaskFitValue(task) === "center") {
          return task.text
        }
        return ""
      }
      gantt.templates.task_class = function(start, end, task){
        console.log(task.color)
        return task.color
      }
      gantt.locale.labels.section_baseline = this.baseline
      gantt.init(this.$refs.gantt)
      gantt.parse(this.tasks)
    }
  }
</script>

<style>
  @import "~dhtmlx-gantt/codebase/dhtmlxgantt.css";
  .baseline {
    position: absolute;
    border-radius: 2px;
    opacity: 0.6;
    margin-top: -7px;
    height: 12px;
    background: #ffd180;
    border: 1px solid rgb(255,153,0);
  }
  .Indigo {
    background-color: #4B0082 !important;
  }
  .Ivory {
    background-color: #FFFFF0 !important;
  }
  .Khaki {
    background-color: #F0E68C !important;
  }
  .LightSteelBlue {
    background-color: #B0C4DE !important;
  }
  .LimeGreen {
    background-color: #32CD32 !important;
  }
  .MediumSlateBlue {
    background-color: #7B68EE !important;
  }
  .Orange {
    background-color: #FFA500 !important;
  }
  .OrangeRed {
    background-color: #FF4500 !important;
  }
  .gantt_parent {
    background-color: #65c16f;
    border: 1px solid #3c9445;
  }
  .gantt_task_line, .gantt_line_wrapper {
    margin-top: -9px;
  }
  .gantt_side_content {
    margin-bottom: 7px;
  }
  .gantt_task_link .gantt_link_arrow {
    margin-top: -12px
  }
  .gantt_side_content.gantt_right {
    bottom: 0;
  }
  .gantt-fullscreen {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 30px;
    height: 30px;
    padding: 2px;
    font-size: 32px;
    background: transparent;
    cursor: pointer;
    opacity: 0.5;
    text-align: center;
    -webkit-transition: background-color 0.5s, opacity 0.5s;
    transition: background-color 0.5s, opacity 0.5s;
  }

  .gantt-fullscreen:hover {
    background: rgba(150, 150, 150, 0.5);
    opacity: 1;
  }
</style>
