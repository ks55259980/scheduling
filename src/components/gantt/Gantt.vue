<template>
  <div ref="gantt"></div>
</template>

<script>
  import 'dhtmlx-gantt'

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
          return false;
        });
        gantt.$_eventsInitialized = true;
      },
      clearAll () {
        gantt.clearAll()
      },
      parse (data) {
        gantt.parse(data)
      }
    },

    mounted () {
      this.$_initGanttEvents()
      for (let key in this.config) {
        gantt.config[key] = this.config[key]
      }
      gantt.locale.labels.section_baseline = this.baseline
      gantt.init(this.$refs.gantt)
      gantt.parse(this.$props.tasks)
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
</style>
