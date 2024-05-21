import { Component, OnInit, Renderer2 } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'DevChuva'

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    const newTopicContainerBtn = document.querySelector('.btn-create-topic')
    const newTopicInputsBtn = document.getElementById("new-topic-inputs-btn")
    const sentTopicBtn = document.getElementById("sent-topic-btn")
    const newTopicContainer = document.getElementById("new-topic-container")
    const newTopicInputs = document.getElementById("new-topic-inputs")
    const sentTopic = document.getElementById("sent-topic")
    const answeredTopic = document.querySelector(".answered-topic")
    const overviewElement = document.getElementById("overview")
    const overviewButton = document.getElementById("overview-button")

    overviewElement?.addEventListener("click", () => {
      const currentSize = overviewElement.getAttribute("data-box-size")
      if (currentSize && overviewButton) {
        overviewElement.setAttribute(
          "data-box-size",
          currentSize === "true" ? "false" : "true"
        )
        overviewButton.textContent =
          overviewButton.textContent === "ver mais" ? "ver menos" : "ver mais"
      }
    })

    newTopicContainerBtn?.addEventListener("click", () => {
      if (newTopicContainer && newTopicInputs) {
        const newTopicContainerValue = newTopicContainer.getAttribute("data-new-topic-container")
        const currentInputContainerValue = newTopicInputs.getAttribute("data-new-topic-inputs")

        if (newTopicContainerValue && currentInputContainerValue) {
          newTopicInputs.setAttribute(
            "data-new-topic-inputs",
            currentInputContainerValue === "true" ? "false" : "true"
          )
          newTopicContainer.setAttribute(
            "data-new-topic-container",
            newTopicContainerValue === "true" ? "false" : "true"
          )
        }
      }
    })

    sentTopicBtn?.addEventListener("click", () => {
      if (sentTopic && newTopicContainer) {
        const sentTopicValue = sentTopic.getAttribute("data-sent-topic")
        if (sentTopicValue) {
          sentTopic.setAttribute(
            "data-sent-topic",
            sentTopicValue === "true" ? "false" : "true"
          )
          newTopicContainer.setAttribute(
            "data-new-topic-container",
            sentTopicValue === "true" ? "true" : "false"
          )
        }
      }
    })

    answeredTopic?.addEventListener("click", () => {
      if (answeredTopic) {
        const commentsContainers = answeredTopic.querySelectorAll<HTMLElement>(".comments-container")
        commentsContainers.forEach((container) => {
          this.renderer.setStyle(container, 'display', container.style.display === "initial" ? "none" : "initial")
        })
      }
    })

    newTopicInputsBtn?.addEventListener("click", (event) => {
      if (event) {
        event.preventDefault()
        if (newTopicInputs && sentTopic) {
          const currentInputContainerValue = newTopicInputs.getAttribute("data-new-topic-inputs")
          const sentTopicValue = sentTopic.getAttribute("data-sent-topic")

          if (currentInputContainerValue && sentTopicValue) {
            newTopicInputs.setAttribute(
              "data-new-topic-inputs",
              currentInputContainerValue === "true" ? "false" : "true"
            )
            sentTopic.setAttribute(
              "data-sent-topic",
              sentTopicValue === "true" ? "false" : "true"
            )

            const newCommentContainer = document.querySelector('.comment-container[data-recently-created="true"]')
            if (newCommentContainer) {
              newCommentContainer.setAttribute("data-recently-created", "false")
            }
          }
        }
      }
    })
  }
}