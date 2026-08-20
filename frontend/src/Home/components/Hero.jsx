import { useRef } from 'react';
import HeroContent from "./heroComponent/HeroContent";

export default function Hero() {
  const brandRef = useRef(null);

  return (
    <section className="relative w-full h-screen min-h-[650px] flex items-center overflow-hidden ">
      {/* Background Image */}
   <img src="/hero.png" alt="" className="absolute  w-full h-full pt-7 -z-10" />

      {/* Light Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-transparent -z-10 md:w-3/4 lg:w-2/3" />
      <div className="absolute inset-0 bg-black/10 -z-10" />

      {/* Center Left Hero Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 pb-24 md:pb-16 flex items-center">
        <div className="w-full lg:w-[60%] xl:w-[55%]">
          <HeroContent />
        </div>
      </div>

      {/* 📍 BOTTOM CENTERED STRIP - Fixed to viewport center-bottom */}
      <div
        ref={brandRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 w-full px-6 py-4  backdrop-blur-xs border-t border-[#573d0c]"
      >
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 md:gap-16 text-center font-mono">

          {/* 1. INSPIRATION */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              INSPIRATION
            </span>
          </div>

          {/* 2. DESIGN */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-gray-900 transition-colors duration-300 hover:text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              DESIGN
            </span>
          </div>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Possimus eum commodi iste, cumque, nemo inventore ratione cupiditate est eligendi, enim numquam quo itaque vel odit quisquam. Illo autem aspernatur nam a quidem culpa, excepturi accusantium aliquid modi atque numquam sit eos cupiditate dolores soluta nulla velit corporis vitae voluptatem saepe porro iste officiis, repellendus minus? Suscipit dolor reprehenderit aliquam, facere deleniti magnam ipsam? Porro incidunt temporibus nobis consequatur quo id suscipit vel reprehenderit laborum blanditiis ex reiciendis minus error commodi, dolore, vitae rem nesciunt ipsam earum eligendi voluptas laboriosam! Reprehenderit necessitatibus libero, itaque vel veritatis repellat vero fuga, eveniet in aliquid perferendis sint consequuntur, ducimus error ullam maiores. Atque placeat tenetur fugit, tempora officiis commodi eaque at quidem itaque voluptatem odit hic? Accusamus aspernatur repudiandae ut commodi soluta laboriosam praesentium sapiente aut, adipisci ab ea atque in labore inventore error nihil perspiciatis! Quis in excepturi voluptate iste alias, et aperiam eligendi placeat deserunt optio minima consequuntur unde delectus sint possimus quos nam impedit quas officia eos quam aliquam. Officia voluptate adipisci sunt quaerat quae unde tempora consequatur expedita cum soluta nobis, corporis dolorum temporibus commodi facere in consectetur libero voluptates et pariatur ratione. Doloribus ipsam laborum nobis numquam rerum dolores ipsa omnis? Quaerat accusantium maiores optio tenetur in, deleniti rerum et necessitatibus tempore pariatur facilis, amet minima ad ratione similique voluptatibus quo temporibus eligendi dignissimos enim. Expedita molestias nam sunt omnis eos voluptas illum assumenda, distinctio tempore iure nostrum harum ea, alias corrupti, deserunt aliquid ratione iste? Veniam similique, neque assumenda exercitationem temporibus quos facere rem odio praesentium illo aspernatur repudiandae corrupti deleniti nulla earum rerum? Doloremque enim iusto ipsum. Nobis nulla aspernatur fugiat consectetur cumque non. Reprehenderit earum officia doloremque necessitatibus distinctio possimus ipsa excepturi, voluptatibus alias dolores blanditiis explicabo voluptas quidem quas accusantium non laboriosam veritatis. Molestiae officia voluptatem nam ratione soluta quo incidunt sint consequatur nisi, provident quibusdam quod corrupti quasi delectus alias ullam quisquam dignissimos exercitationem, suscipit natus. Rem provident, aspernatur facilis fuga, corrupti, omnis odio veritatis dolor necessitatibus eum vel ullam. Dolorem, hic adipisci aliquam eaque neque explicabo officia! Magnam vitae tempore suscipit architecto ex libero voluptates possimus esse, reprehenderit nisi officiis sit unde illo voluptas explicabo. Dolor, mollitia? In quos natus ab ea consequatur temporibus, numquam nemo amet rerum voluptatum, modi porro nostrum iste quas est voluptas pariatur? Hic impedit magni sunt delectus quae animi assumenda, omnis harum voluptatibus adipisci neque sed excepturi. Ipsum molestiae corrupti adipisci ullam. Quaerat iusto numquam optio minus eum distinctio dolore ad porro illo accusantium neque earum velit quas magnam nisi atque itaque placeat nobis error vero, voluptate, facere deserunt mollitia. Magnam atque delectus deserunt praesentium alias! Accusamus deleniti velit, id harum cumque dignissimos, suscipit in unde repellat maiores sequi voluptatum ea consequuntur distinctio officiis atque voluptates explicabo mollitia, alias natus laboriosam nam nemo. Eaque tempora quo eius, similique animi in architecto, enim aliquam iure, eveniet rerum facilis voluptatem odit. Quaerat id numquam architecto ipsam expedita voluptas tenetur perferendis, vero soluta quasi, saepe asperiores iste totam, nostrum corporis! Enim praesentium soluta odit iusto perspiciatis, veritatis dolorem eum repellendus, amet ipsam doloribus rerum quia assumenda similique possimus nesciunt consequatur quis non expedita! Dolorum et ducimus natus earum fugit. Accusamus sequi odio facilis amet aliquid harum ullam ex accusantium consequuntur maiores omnis tempora assumenda magnam inventore eos ratione temporibus eveniet eius consectetur nemo dignissimos, quos dolorem? Porro corrupti consectetur quas neque quam. Aut deleniti nam quaerat iusto nulla. Dolor quae molestiae deserunt aspernatur corporis optio iure culpa animi? Perspiciatis recusandae harum veniam eligendi tenetur officiis autem id voluptas, atque, omnis debitis ullam fuga! Voluptatum quo at ab repellendus iusto adipisci sunt, ipsam laborum. Recusandae est inventore ea cum aspernatur placeat quod distinctio quis voluptate velit ipsa perferendis itaque ducimus, omnis in, autem, illum consectetur hic quam quibusdam quisquam vel. Quas ipsum eaque suscipit ratione deleniti quidem est blanditiis labore ut eius odit sapiente quasi porro quod vitae, doloremque cumque? Ducimus, quasi maiores. Aliquam dicta minima sint, cumque incidunt et explicabo fuga perferendis voluptates qui cupiditate a culpa aliquid excepturi aperiam nobis omnis nulla magni numquam modi non dolor eveniet eius? Odio, delectus ab quasi cupiditate iure ipsam quos expedita incidunt maiores dolorum ratione aut consequatur molestiae quod quia inventore explicabo labore voluptatum, odit architecto consectetur numquam ipsa. Debitis consequuntur tenetur, quo similique, odio vitae nobis quae illum a corporis ut architecto voluptatibus nemo incidunt. Placeat dolore fugit, culpa veniam nemo eum illum blanditiis reiciendis aut in possimus numquam explicabo, tempora quia itaque aliquam distinctio temporibus suscipit alias dolorum impedit eaque quam laboriosam! Itaque sint ullam asperiores impedit quae reprehenderit deserunt maxime ducimus magni, quas laboriosam quibusdam non mollitia praesentium eaque perferendis, rerum alias sunt? Provident accusamus pariatur aperiam officia. Beatae aspernatur repellendus voluptas porro debitis. Aut illo magnam corrupti omnis tenetur sit voluptate quod, blanditiis reprehenderit beatae maiores ratione, voluptatem in, iusto repudiandae aspernatur commodi neque veritatis nesciunt libero vero! Doloremque recusandae obcaecati itaque debitis, voluptatibus neque corporis. Dolorum commodi molestiae qui incidunt eveniet tempora culpa atque laborum laboriosam non cupiditate nihil obcaecati sequi dolore, voluptatum deserunt laudantium modi ea adipisci eos porro. Quod, dolorum quae. Odio corrupti fuga repellat maiores soluta quia consequuntur fugit ducimus, mollitia quaerat dolorem itaque harum nostrum, eius commodi accusantium aspernatur suscipit et sint alias quisquam? Unde cumque officia in cupiditate velit nesciunt nobis ex quis provident debitis? Adipisci sit voluptatem illum quae. Adipisci optio dolores quod natus quos facilis consequuntur deserunt! Perferendis explicabo veritatis eius ipsum quisquam rerum. Obcaecati cum facere velit sint enim repudiandae? Assumenda fuga ipsam illo recusandae similique, quos id alias commodi temporibus totam tempore consectetur, aut quasi deserunt atque placeat odit! Dignissimos neque amet rerum harum, voluptates laudantium, illum cumque, esse ducimus consequuntur unde. Eum eaque expedita ut corrupti dicta illo veritatis voluptatum. Voluptatibus a illum at consequatur nam error labore, cum eius sint suscipit veritatis? Omnis libero fugiat dolorum! Accusamus obcaecati optio natus ab odio exercitationem voluptatem perferendis voluptatibus soluta tempora sapiente voluptates esse, ut veniam labore laborum iste dolorem voluptas hic eveniet doloremque mollitia possimus a. Unde, temporibus provident.
          {/* 3. REALITY */}
          <div className="relative group inline-flex items-center justify-center px-2 py-1">
            <div className="absolute inset-0 -z-10 bg-white/60 rounded-full blur-lg opacity-80 group-hover:opacity-100 transition-opacity" />
            <span className="font-black tracking-[0.22em] text-sm sm:text-sm  text-gray-900 transition-colors duration-300 hover:text-[#8B6D35] drop-shadow-[0_0_12px_rgba(255,255,255,0.95)]">
              REALITY
            </span>
          </div>

        </div>
      </div>
    </section>
  );
}