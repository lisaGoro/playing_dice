function Hands({ numbers }) {
    let num = numbers[numbers.length - 1];
    
    let exercises = [<><h4>Разжимания кистей</h4>
        <p>Полезное упражнение, которое разминает все мелкие суставы и связки кисти, 
            улучшает кровообращение рук. Обязательно к выполнению для людей, работающих за компьютером.
            Выполните 8-10 разжиманий всего.</p></>,

        <><h4>Разведение прямых рук</h4>
        <p>Широкие разведения рук укрепляют плечевой отдел, улучшают осанку, 
            а также избавляют от дряблости рук и подмышечной зоны. 
            Выполняйте разводки на выдохе, сводите лопатки.
            Выполните 8-10 разведений рук.</p></>,

        <><h4>Вращение локтей</h4>
        <p>Такие вращения хорошо разрабатывают локтевые суставы. 
            Кроме того, это упражнение из офисной гимнастики укрепляет суставы и мышцы плеч, 
            улучшается подвижность и мобильность рук.
            Выполните 6-8 вращений назад, затем 6-8 вращений вперед.</p></>,

        <><h4>Подъем рук и колена</h4>
        <p>Упражнение ускоряет сердечный ритм и укреплениет мышцы верхней и нижней части тела. Такая синхронная работа рук
             и ног улучшает координацию, возвращает ясность и концентрацию. Разрабатываются плечевые и коленные суставы,
              не меньше работает тазобедренный сустав. Выполните 10-12 подъемов рук всего.</p></>,

        <><h4>Сгибание рук со сведением лопаток</h4>
        <p>Одно из лучших упражнений для улучшения осанки и укрепления мышц спины. 
            На выдохе сгибайте рук и сводите лопатки, отводя локти максимально назад. 
            Раскрывается грудная клетка и плечевой отдел, уходит сутулость. Выполните 8-10 разведений рук</p></>,

        <><h4>Вращение кистей</h4>
        <p> Вращения кистями помогают размять лучезапястный сустав и избавиться от ограниченной подвижности. 
            Выполните по 8-10 вращений в одну и в другую сторону.</p></>];

    return (
        <div>
            <h2>Задание №{num}</h2>
            {exercises[num - 1]}
        </div>
    );
}
export default Hands;