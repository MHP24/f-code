import { fCodeApi } from '@/api';
import { AdminLayout } from '@/components/layouts';
import { db } from '@/database';
import Image from 'next/image';
import { ICreatorRequest, IProfileData } from '@/interfaces';
import { CreatorRequest } from '@/models/CreatorRequest';
import { GetServerSideProps, NextPage } from 'next';
import styles from '@/styles/admin/applications.module.css';
import { LanguageProgress } from '@/components/ui';

interface Props {
  application: ICreatorRequest;
  profile: IProfileData;
}

const ApplicationDetailPage: NextPage<Props> = ({ application, profile: { profile } }) => {




  return (
    <AdminLayout
      pageDescription={`Creator application details`}
      title={`Application #${application._id}`}
    >
      <div className={styles.rootApplication}>

        <section className={styles.userDetails}>
          <div className={styles.profileUser}>
            <Image
              className={styles.profilePicture}
              src={profile.picture}
              alt={profile.username}
              width={150}
              height={150}
            />

            <p className={`${styles.title} ${styles.username}`}>{profile.username}</p>


            <div className={styles.actions}>
              

            </div>
          </div>

          <div className={styles.applicationDetails}>
            <h3 className={styles.title}>{'Application details'}</h3>
            <div className={styles.applicationDetail}>
              <p className={styles.detailText}>{application.subject}</p>
            </div>

            <div className={styles.applicationDetail}>
              <p className={styles.detailText}>{application.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt recusandae consequuntur alias soluta quos consequatur maxime omnis voluptas quibusdam iure corporis, exercitationem aspernatur distinctio ullam nostrum natus illum voluptatem, ea amet. Exercitationem voluptates, aperiam, repudiandae consequatur et in alias itaque, sunt ullam neque dolores ipsam dignissimos harum assumenda! Quam eaque ut nisi itaque beatae sed ipsam cum, tempora mollitia perspiciatis molestias quasi aliquid hic blanditiis cupiditate delectus corporis nihil ipsa pariatur velit voluptatum consequuntur impedit doloribus dolore. Quisquam, odio, sapiente consectetur aperiam explicabo nihil magni ut esse odit a nemo totam earum tempore quia voluptatem fuga sequi illum eius praesentium possimus minus error. Excepturi neque laborum, ex quas, veniam consectetur nam, eos corporis odio saepe dolor! Exercitationem dignissimos quia magni qui est. Aperiam asperiores recusandae ex nulla? Corrupti sequi quo explicabo quis numquam, cum sapiente exercitationem commodi fugit maxime, cupiditate unde cumque provident ipsum doloremque laudantium. Culpa quam aliquid odio id rem quisquam. Ratione voluptatum, omnis aliquam voluptatem totam eos recusandae quibusdam aspernatur ullam praesentium dolores iusto architecto incidunt atque quod qui quae labore unde. Placeat magnam nostrum nemo quae tenetur reprehenderit fuga sint consectetur ipsum facere enim iure consequuntur vitae necessitatibus possimus perspiciatis explicabo cum aliquam at exercitationem, maiores eius doloremque corporis eos. Possimus animi dolorum aliquam adipisci incidunt fugit expedita dolores ad magnam, veniam dolorem tempore soluta facilis placeat laborum iusto voluptatem dicta obcaecati. Sed error, pariatur eos necessitatibus aliquid explicabo expedita eligendi neque ipsum libero suscipit minima, ad quibusdam illo est perferendis animi, at cumque unde eaque? Asperiores repellendus repudiandae unde possimus et, nisi sint tenetur. Pariatur voluptate ipsam minus corporis eligendi delectus quo cupiditate soluta esse optio veritatis provident illum magni eveniet, dolor culpa voluptatibus commodi sequi, ducimus eius! Ex, repudiandae nihil eum minus iure delectus quis iste deserunt maiores temporibus id accusamus excepturi amet? Repellat vitae pariatur ullam sequi soluta repudiandae odit impedit sed officiis laboriosam saepe id, commodi provident, perferendis voluptatum quisquam voluptate consectetur! Expedita numquam rerum debitis dolores accusamus sed labore, eveniet, quibusdam sequi impedit sunt rem esse, repudiandae dolorum laboriosam ut quam delectus incidunt consequuntur cumque illum? Deleniti, molestias aspernatur? Dicta rerum amet omnis laudantium pariatur obcaecati unde vitae debitis tempore ab perspiciatis laboriosam in fuga ut, suscipit nulla odio nobis minima recusandae necessitatibus. Magnam ex inventore culpa odio, illum labore sapiente consectetur accusamus in ipsa hic commodi iusto soluta explicabo sit eveniet. Sunt recusandae nesciunt voluptatibus, possimus, sit error dolorem similique incidunt repellat, mollitia eligendi eos? Et ipsa voluptatibus perspiciatis omnis ipsum atque facilis deserunt fugit sit? Consequatur, omnis! Architecto, vel incidunt. Rem omnis veritatis excepturi doloribus asperiores commodi ut quia aperiam sit in adipisci, quasi, atque aliquam. Commodi nobis reiciendis, sequi laborum deleniti officiis, ipsam quia iure nisi magnam soluta unde sed, autem aliquid necessitatibus temporibus vel facilis consequatur odit laudantium reprehenderit quos maiores! Dolorum beatae delectus obcaecati, soluta sit alias sapiente ea vitae ad iure repellendus praesentium deserunt quaerat reiciendis dolorem quo aut inventore ipsa aperiam animi repellat. Necessitatibus modi ipsum tempora repellendus sequi voluptates fugit labore ut ad assumenda rerum, quidem quae harum repudiandae ipsa consectetur pariatur fuga incidunt. Enim harum placeat magni fugiat et sunt nostrum assumenda sapiente aliquid reiciendis ratione tempora, officia amet laboriosam fugit porro id at a quaerat blanditiis iure. Architecto placeat nostrum rem dignissimos incidunt consectetur voluptas in possimus obcaecati est praesentium nobis perferendis laboriosam doloribus, voluptatem et dolorem natus cum minima facilis perspiciatis! Quia consequuntur dignissimos quod reprehenderit blanditiis laborum quae ipsum, itaque, sunt illo debitis quibusdam quos consequatur nisi tenetur beatae voluptates, ut dolores? Iure amet eos quaerat numquam alias. Inventore rerum iure dolorem ex odio ab, ea ut at culpa reprehenderit molestiae est voluptatem mollitia esse eius accusamus! Obcaecati numquam eaque dolorem maxime quibusdam suscipit at iusto qui laboriosam porro repellendus nam quasi explicabo mollitia quam, deleniti ipsa? Numquam, et nemo corrupti exercitationem distinctio saepe porro temporibus cumque laudantium suscipit aliquid nihil voluptatum, optio cum maiores placeat expedita voluptate sunt est? Harum voluptatem nisi nulla reiciendis ut, eum ratione nam laborum odio vitae recusandae. Soluta laboriosam cupiditate, porro distinctio eos voluptate sunt consequuntur expedita repellendus quas consectetur quae repudiandae eveniet facilis illo architecto quisquam vero asperiores itaque corporis eius officiis? A ducimus aliquid accusamus cumque, dolorem aspernatur beatae eos? Inventore voluptates non fugiat praesentium nemo, deserunt aut voluptatem repellendus laudantium, exercitationem veniam. Quia, natus velit dolore temporibus earum laborum quas totam exercitationem eius suscipit blanditiis asperiores, architecto non iure distinctio ea minima ex? Vero doloribus et, voluptate unde corrupti sed. Eveniet odit quis ab, quidem fugit ipsam. Natus vero quisquam ad nihil maxime distinctio doloribus dolore, facilis culpa porro a accusantium, id voluptatum totam dolorum consequuntur cum enim. Rem quibusdam, quidem, eligendi nobis repudiandae temporibus, quia obcaecati voluptatem voluptatum corporis inventore architecto? Nostrum corporis iste aliquid est soluta necessitatibus quod aliquam tenetur reiciendis amet, voluptatem sit aspernatur atque adipisci, molestias sint nihil rerum placeat a suscipit voluptatum ipsa voluptate eaque explicabo. Neque sequi tempora, quia, unde qui porro iusto expedita incidunt commodi exercitationem eius? Neque quidem natus quis laudantium voluptate placeat odit dolore nulla necessitatibus fugiat voluptates aliquid ipsam dicta quos velit, adipisci eius animi est quae iste enim debitis, temporibus sunt? Eum aliquam voluptatum, aliquid doloribus fugiat maxime ullam provident asperiores similique architecto quidem quae amet sint. Repudiandae exercitationem aliquam delectus recusandae quibusdam? Praesentium fuga doloribus vero unde facilis voluptatibus minima cupiditate ducimus quaerat animi, iusto ipsam. Quisquam optio explicabo ullam officia accusantium sapiente praesentium voluptates tenetur dolorum possimus!</p>
            </div>
          </div>


        </section>

        <section className={styles.techs}>
          <div className={styles.challenges}>
            <p className={styles.challengesNumber}>{profile.technologies.challengesCompleted}</p>
            <p className={styles.challengeSubtitle}>Challenges completed</p>
          </div>
          <div className={styles.distribution}>
            {
              (
                profile.technologies
                  .challengeDistribution
              ).map((tech, i) => {
                return (
                  <LanguageProgress
                    key={`language-progress-application-dashboard-${i}-${tech.language}`}
                    {...tech}
                  />
                )
              })
            }
          </div>
        </section>
      </div>

    </AdminLayout>
  )
}

export default ApplicationDetailPage;


export const getServerSideProps: GetServerSideProps = async (req) => {
  try {
    await db.connect();
    const { id = '' } = req.params as { id: string };

    const application = await CreatorRequest.findById(id).select('-__v -createdAt -updatedAt').lean();
    const { data: profile } = await fCodeApi.get(`/users/profile/${application.userId}`);

    if (!application || application.closed) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
    }

    return {
      props: {
        application: {
          ...application,
          _id: `${application._id}`,
          userId: `${application.userId}`,
        },
        profile
      }
    }
  } catch (error) {
    console.error({ error });
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  } finally {
    await db.disconnect();
  }
}