import Dropdown from "./tipDropDown";

export const InformationTips = () => {

    return (
        <section className="flex flex-col gap-4">
            <Dropdown 
                title="1. Take shorter showers"
                content="Taking a long hot shower is something many of us take for granted—just like turning on the tap when we need to drink, bathe, or cook. But the story is alarmingly different for the more than two billion people who currently live without safely managed drinking water services." />
            <Dropdown 
                title="2. Consider the distance" 
                content="The transportation of food and other goods requires a great deal of water. Why? Because it takes about 1.5 liters of water to refine a liter of crude oil. When you choose local foods, you’re eliminating many of these hidden water expenditures from the supply chain. So when you’re checking out at an online retailer, ask yourself—do you really need two-day shipping? Patience is a water-saving virtue." />
            <Dropdown 
                title="3. When you buy products grown in the tropics..." 
                content="…like coffee, tea, chocolate, or bananas, look for the green frog seal. Rainforest Alliance Certified farms prioritize water conservation and the protection of local rivers and streams." />
            <Dropdown
                title="4. Buy less clothing"
                content="The average consumer goes through 16 kilograms of textiles per year—and cotton is one of the thirstiest crops out there. It can take more than 2,700 liters of water to produce just one cotton t-shirt. Reducing the amount of new clothing you buy can be one of the simplest and most effective ways to save water. Shop at vintage stores, swap clothing (a great party idea), and recycle your old clothes. And buying secondhand takes you out of the “fast fashion” cycle—you won’t be supporting unethical labor practices or unsafe working conditions." />
            <Dropdown
                title="5. Grow drought-resilient plants"
                content="With increasing temperatures and more frequent and prolonged dry spells, switching out the thirsty plants in your garden for ones adapted to need less water just makes sense. Depending on where you live, succulents like agave and mangave are obvious choices, while flowering plants like aster and lantana can provide vibrant pops of color even in the driest and hottest months." />
            <Dropdown
                title="6. Get creative with your leftovers"
                content="It takes a lot of water to grow our food. That avocado that went bad on your counter? Say goodbye to as much as 320 liters of water. Reducing your food waste—by planning your meals, buying only what you need, storing food properly, and, yes, eating all of your leftovers—also drastically reduces your water footprint, making it one of the best tips for saving water. Your wallet will thank you, too. Check out our tips for more ways cut down on food waste!" />
            <Dropdown
                title="7. Skip baths"
                content="Instead, take short showers, ideally under a water-saving shower head. And here’s a pro tip for shavers: The simple act of shutting off the tap while you lather up can save more than 37 liters of water per shave." />
            <Dropdown
                title="8. Demand accountability"
                content="While shorter showers and better appliances help, the truth is that the biggest culprits of water waste are corporations and government policies that allow overuse and mismanagement. One of the most powerful tips for saving water is to speak up—by voting for leaders who prioritize water conservation, joining conservation advocacy groups, and holding industries accountable. Real change happens when communities push back and demand smarter, more sustainable water policies." />

        </section>
    );
};