# Solution - Abhinav Prasannakumar

## Task Completed
Frontend

## Time Spent
[Approximate hours]

## Approach
### Research and Design

Initially, I spent approximately 1.5 to 2 hours on research. After receiving the assessment requirements, I first reviewed them thoroughly and noted down the key points.

I then conducted initial research on the subject. Following this, I tested the backend API using an API testing tool to retrieve the data. I carefully analysed the API response structure.

I also spent time researching and understanding the domain context and data, for example:
- What an “instance” represents in a teaching assessment  
- What an “element” refers to  
- What data types are returned in the API response  

Next, I reviewed the provided frontend structure to gain a high-level understanding of how the data is organised in the view.

After analysing both the requirements and the API response, I identified the key data points and decided how they should be grouped. I determined which data should be visualised together and organised the data into five main sections:

1. Element Completion Details  
2. Score Details  
3. Question and Answer  
4. Chart for Question and Answer  
5. Insights  

##### 1) Element Completion Details
- Radial chart to represent completion percentage  
- Total Questions  
- Answered Questions  
- Completion Percentage  
##### 2) Score Details
- Radar chart  
- Element  
- Total Score  
- Maximum Score  
- Percentage (colour-based representation)  
##### 3) Question and Answer
- Detailed Q&A with filter  
- Questions list  
- Button for detailed view modal  
##### 4) Chart for Score per Question
##### 5) Insights  

After defining these sections, I created a [wireframes](./Phase1/) based on this structure. I have used Figma for High Fidelty wirefram after creating hand drawn sketches.

I focused on designing a complete dashboard layout with Sidebar navigation and a TopBar. This ensures that the layout is scalable for future enhancements. New features or functionality can be implemented later without refactoring the entire dashboard structure.

Each section was planned as an individual card within a grid layout to support responsiveness and allow clear analysis of the data.

The input field was placed in the TopBar so that the full assessment result can be dynamically displayed in the main section.

## Development
First I have focused on clear and standard project structure because:
- Easy to maintain
- Easy to scale in the future
- Easy to understand for other developers who are working on this project.

### File tree
├── src  
│   ├── assets  
│   ├── components  
│   ├── features  
│   ├── hooks  
│   ├── layouts  
│   ├── lib  
│   ├── services  
│   ├── types  
│   ├── App.tsx  
│   ├── index.css  
│   ├── main.tsx    
├── index.html

### Project Structure
- /assets - Static files such as images
- /components - Reusable UI components
- /features - Feature level component (eg: Dashboard)
- /hooks - Custom resusable hooks
- /layouts - Layout components (eg:App Layout)
- /lib - Utilities
- /service - API Abstraction Layer
- /types - Centralised TypeScript interfaces


## Implementation Details
### Features Implemented
- [Question-by-question breakdown](#question-by-question-breakdown)
- [Score visualisation](#score-visualisation)
- [Data transformation](#data-transformation)
- [Detailed question view](#detailed-question-view)
- [Filtering](#filtering)
- [Export PDF](#export-pdf)
- [Loading/error/empty states](#loadingerrorempty-states)
- [Responsive design](#responsive-design)
- [Interactive tooltip](#interactive-tool-tip)
- [Dark mode toggle](#dark-mode-toggle)
- [Keyboard navigation and ARIA labels](#keyboard-navigation-and-aria-labels)
- [React Testing Library tests](#react-testing-library-tests)

### Question-by-question breakdown
Question-by-question breakdown was implemented. Questions are retrieved from API Response under element_scores. Since the API groups question by element, the correct element under element_scores is selected based on results.instance.element.

Question is redered conditionally based on its type(Reflection, Likert/MCQ type).

- Reflection 
    - Question title  
    - Selected answer text  
    - badge indicating reflection
- Likert/MCQ type
    - Question title  
    - Option Number
    - Selected answer text  
    - score badge
For unanswered question in both types,display a custom "Not Answered" Message along with icon

### Score visualisation
Score visualisation is implemented for clear data representation. Visualisation was used in CompletionCard, Score Card and Score Per Question.

- Use radial chart for representing total completion.
- Use radar chart for representing element based scoring (Since current API Response have limited data, only a point is appearing on the dashboard)
- Use bar chart for representing Score Per Question

### Data transformation
Nested data from API response is derived using useMemo. Transformed data shared between components down the tree. Mainly derived data:
- Question
- Chart data
- Score Per Question
### Detailed question view
Modal component was used for detailed question view. Inside the modal, contains a filter element built using radio input component to filter Question and Answer. A scrollable container containing Question, answer, and badge to represent each question. Initially thought of adding stepper component to render each question but changed to scrollable container because of ease of use and UX.

### Filtering
Filtering funtionality implemented inside Detailed question view. Filtering logic based on status. It is implemented using radio input element having 3 options (All, Answered, Unanswered). Seleted filter was managed through local state. Original array was not mutated, new array derived from original was used for filtering, making sure original array stays unchanged (Array mutation is not considered as a good practise in react).

### Export PDF
Functionality to export the data as pdf implemented using react-pdf library. Created new components only focused on exporting.
Used AI assitance to implement this feature.

### Loading/error/empty states
#### Loading State
A loading state will trigger whenever a new instance Id is entered.
Implemented skeleton loading for better UX. The loading state is managed by useState and updated inside the useEffect data-fetching lifecycle.

#### Error State
Trigger when API request fail. Custom error component will be displayed with error message for better UX. 

#### Empty State
Trigger when no Id entered in InstanceIDInput. Custom empty state will be displayed with message to enter new ID

- For both Error state and Empty State, Illustrations were used for better user experience.

### Responsive design
The dashboard was designed with responsiveness in mind. The layout is reponsive accross all devices. Grid is used to design main dashboard element. Flex used inside individual components. Responsive Container used for Charts and Other elements. On device screen width less than 1024px, dashboard grid will stack, else it span accross screen based on grid specified. Responsiveness ensures the dashboard is accessible with any device.

### Interactive Tooltip
Interactive tooltips were implemented within the chart components to improve data clarity and user understanding.

### Dark mode toggle
Dark mode was implemented for accessibility and provide user with theme prefernce. Used Shadcn Theme Provider component and wrapped around App Component to implement dark mode. Used tailwind "dark:" modifier with component to make sure every component is optimised for light as well as dark theme.

### Keyboard navigation and ARIA labels
- Keyboard accessibility was considered throughout the implementation to ensure the dashboard is usable without a mouse.

- SideBar can be toggled using CTRL/CMD + b
- Tab key can be used to navigate through out the dashboard. Enter key for selecting.
- All interactive element such as Buttons, Input etc are accessible using Keyboard for mouse free interaction.
- ARIA labels and semantic html were used.
## Tools & Libraries Used
### AI Tool Used
#### Claude
- For writing some code logic such as pdf export

#### ChatGPT/Gemini
- For understanding domain

#### Co-pilot (Github Desktop Integrated)
- For writing better git commit message and description

### Component library
#### [Shadcn](https://ui.shadcn.com/)
- Open source component library which provide full control over the components. It also provide Chart component which built on top of [recharts](https://recharts.github.io/).

- Used this component library to keep everything consistant throughout the project

### Styling
#### [Tailwind CSS](https://tailwindcss.com/)
- utility first css framework to keep the app styling consistant accross the product.
- Integrate well with Shadcn and vite

### Icons
#### [Phosphor Icons](https://phosphoricons.com/)
- Open source icon library

### Illustrations
#### [UnDraw]("https://undraw.co/illustrations)
- Open Source illustration library offering various illustrations
- Used in Empty/Error states

### Exporting as PDF
#### [React-Pdf](https://react-pdf.org/)
- Open Source react pdf generator used in generating pdf

### Testing
#### [Vitest](https://vitest.dev/)
- vite native testing framework


### React Testing Library tests
## Testing

I implemented component tests for a few components (eg: Dashboard, CompletionCard) using Vitest. I also attempted to implement integration testing, but I was not able to complete it.
Due to limited time, I could not complete all the planned testing. Also, because of my limited knowledge in testing, I could not finish the integration testing part. I have used AI Assistance to integration testing and some part of component testing.

### Test scenarios
##### Component
- For Completion Card, "Total Number of Question", and "Total Number of Answered Question" appear on the screen, Given values showing on the screen.
- For ChartBar, If the percentage render correctly
- For Dashboard, empty component displayed when instanceId is missing, When instanceID provided, loading screen display first, after successful API fetch, display PageHeader, PageActions, CompletionCard receive correct data.

##### Integration Testing

- If data from API correctly processed by frontend, whether error states handle correctly, loading state trigger correctly. 

## Challenges & Solutions
These are the challenges I have faced during the development.
### Grid Layout Issue
I have struggled to develop grid layout for the main dashboard at first. It was getting disoriented because of poor grid layout. Then I have used [Grid Generator](https://cssgridgenerator.io/). It helped visualise grid layout and implemented grid layout properly that works accross all devices.

### Question by Question Breakdown
Understanding API response data particulary for Question was difficult at first due to nullable data values.
To understand the data better, I have wrote down all the nullable data, optional data, data that are repeating, and I could find a pattern in it.(eg: is_answered will give if the question is answered or not, reflection is for detailed answer which wont contain option_number). Find out there are two types of data in the given response, Likert/MCQ and Reflection. Going through assessment requirement and code was also helpful. Another step I have used was, I used api testing tool for better understanding of the data visually rather than using curl.

### Chart Integration
Chart required simple data. So I need to use derived data depending on the data that chart required. Going through charts documentation in shadcn as well as rechart helped understand better.

### Export PDF Functionality
It was first time I tried to export react component to pdf. I have referred few youtube videos, online materials and tried to implement that functionality using html2canvas and jsPdf library. Unfortunately html2canvas library doesn't support oklch color format. The whole application color scheme from tailwind css uses oklch format which caused error. Then I have researched online, used AI to find out alternate libraries. I have found react-pdf/renderer would be the best match. With the help of AI, I have implemented that functionality.



## Trade-offs & Future Improvements

### Export PDF Functionality
Currently export PDF function export basic data and chart. I have relied on AI for most of the implementation because of the limited time. In the future, I will go through official documentaion, understand the library better and try to export the data in a much similar to current dashboard. Also include multiple export options such as JSON, clipboard etc.

### Dynamic Component 
Some of the component (eg: ElementSelector) is currently developed as purely presentational components, that can be changed in the future to accept dynamic data and update the state accordingly

### Implementation of Comparison View
Couldnt complete element comparison view. In the future that can also be included.

### Frontend Routing
Currently the whole application layout and components are build with future improvement in mind. But currently Nav menu in AppSideBar is static (Overview menu item). In the future, using routing library like [react-router](https://reactrouter.com/) to implement routing. This will enable future addition of features/functionality easier without complete restructuring of UI.

### Bulky component and Nested Conditional Rendering

Some of the component (eg: QuestionAndAnswerInDetail) is bulky and uses complex nested conditional rendering. In the future, it can be refactored and optmise the component much better.

