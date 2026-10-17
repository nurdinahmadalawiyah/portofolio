"use client";

import { useState } from "react";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal";
import { siteConfig, type SiteConfig, type WorkId } from "@/config/site";
import type { Dictionary } from "@/i18n/dictionaries";
import { useFormat, useT } from "@/i18n/context";
import { Avatar } from "@heroui/avatar";
import { motion } from "framer-motion";

const entrance = {
  hidden: { opacity: 0, y: 58 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as const },
  },
};

type GalleryItem = SiteConfig["work"][number]["gallery"][number] & {
  label: string;
  caption: string;
};

type ValueOf<T> = T extends Record<string, infer V> ? V : never;
type WorkCopy = Dictionary["experience"]["work"][WorkId];
type RoleCopy = ValueOf<WorkCopy["roles"]>;

type ModalState = {
  isOpen: boolean;
  position: string;
  jobDesc: string[];
};

type GalleryModalState = {
  isOpen: boolean;
  company: string;
  gallery: GalleryItem[];
  index: number;
};

export default function ExperiencePage() {
  const t = useT();
  const format = useFormat();
  const [modal, setModal] = useState<ModalState>({ isOpen: false, position: "", jobDesc: [] });
  const [galleryModal, setGalleryModal] = useState<GalleryModalState>({
    isOpen: false,
    company: "",
    gallery: [],
    index: 0,
  });

  const calculateDuration = (start: string) => {
    try {
      const [startYear, startMonth] = start.split("-").map(Number);
      const startDate = new Date(startYear, startMonth - 1, 1);
      const endDate = new Date();

      let years = endDate.getFullYear() - startDate.getFullYear();
      let months = endDate.getMonth() - startDate.getMonth();

      if (months < 0) {
        years--;
        months += 12;
      }

      // Include the current month
      months++;
      if (months >= 12) {
        years++;
        months -= 12;
      }

      const parts: string[] = [];
      if (years > 0) parts.push(format(t.common.yearsShort, { years }));
      if (months > 0) parts.push(format(t.common.monthsShort, { months }));

      return parts.length > 0 ? parts.join(" ") : null;
    } catch (e) {
      return null;
    }
  };

  const activeGalleryItem = galleryModal.gallery[galleryModal.index];

  const changeGalleryPhoto = (direction: number) => {
    setGalleryModal((previous) => {
      const nextIndex = previous.index + direction;
      if (nextIndex < 0 || nextIndex >= previous.gallery.length) return previous;

      return { ...previous, index: nextIndex };
    });
  };

  return (
    <section className="relative flex flex-col items-center justify-center gap-8 py-12 md:py-24 w-full max-w-6xl mx-auto px-6 overflow-hidden">
      {/* Giant Background Text Watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 pointer-events-none select-none z-0 opacity-[0.04] dark:opacity-[0.08]">
        <h1 className="text-[12rem] md:text-[20rem] font-black tracking-tighter leading-none text-foreground whitespace-nowrap">{t.experience.watermark}</h1>
      </div>

      <motion.div
        id="experience"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative z-10 w-full mb-12 flex flex-col items-start"
      >
        <h2 className="text-sm font-black uppercase tracking-[0.5em] text-turquoise mb-4">{t.experience.eyebrow}</h2>
        <h3 className="text-4xl md:text-5xl font-black tracking-tight text-foreground">
          {t.experience.titleLead}<span className="text-turquoise italic font-serif font-light">{t.experience.titleAccent}</span>
        </h3>
      </motion.div>

      <motion.div
        className="relative z-10 w-full"
        variants={entrance}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="absolute left-5 top-4 bottom-4 w-px bg-gradient-to-b from-transparent via-turquoise/40 to-transparent md:left-1/2 md:-translate-x-1/2" />

        <div className="flex w-full flex-col gap-8 md:gap-12">
          {siteConfig.work.map((item, index) => {
            const work = t.experience.work[item.id];
            // Key cast: TS can't tie a union-typed work item to its own dictionary branch.
            const workRoles = work.roles as Record<string, RoleCopy>;
            const workGallery = work.gallery as Record<string, { label: string; caption: string }>;
            const isRight = index % 2 !== 0;
            const story = work.story;
            const gallery: GalleryItem[] = item.gallery.map((photo) => ({
              ...photo,
              ...workGallery[photo.id],
            }));
            const galleryPreview = gallery.length > 3 ? gallery.slice(0, 2) : gallery;
            const remainingGallery = gallery.length > 3 ? gallery.slice(2) : [];

            return (
              <motion.div
                key={item.company}
                className="relative grid w-full items-start grid-cols-[2.5rem_1fr] gap-4 md:grid-cols-[1fr_5rem_1fr] md:gap-8"
                initial={{ opacity: 0, y: 54 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
              >
                <div className="relative z-10 col-start-1 row-start-1 flex justify-center md:col-start-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-turquoise/30 bg-background md:h-16 md:w-16">
                    <Avatar
                      src={item.image}
                      name={item.company}
                      className="h-7 w-7 border border-white/10 md:h-11 md:w-11"
                      radius="md"
                    />
                  </div>
                </div>

                <div className={`col-start-2 row-start-1 self-center pb-4 md:pb-0 ${isRight ? "md:col-start-1 md:text-right" : "md:col-start-3 md:text-left"}`}>
                  <div className={`flex flex-col gap-3 ${isRight ? "md:items-end" : "md:items-start"}`}>
                    <h4 className="max-w-sm text-2xl font-black tracking-tight text-foreground md:text-3xl">
                      {story.title}
                    </h4>
                    <p className="max-w-md text-sm font-medium leading-7 text-default-500 dark:text-default-400">
                      {story.desc}
                    </p>

                    {gallery.length > 0 && (
                      <div className="mt-6 w-full max-w-sm">
                        <div className="group/moments relative rounded-xl border border-black/10 bg-background/50 transition-all duration-300 hover:border-turquoise/50 dark:border-white/10">
                          <button
                            type="button"
                            aria-haspopup="dialog"
                            aria-label={format(t.common.galleryRegion, { company: item.company })}
                            onClick={() =>
                              setGalleryModal({ isOpen: true, company: item.company, gallery, index: 0 })
                            }
                            className="absolute inset-0 z-10 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/70"
                          />
                          <div className="flex items-center gap-3 p-2">
                            <div className="flex shrink-0 items-center gap-1.5">
                              {galleryPreview.map((photo, photoIndex) => (
                                <button
                                  key={`${item.company}-peek-${photoIndex}`}
                                  type="button"
                                  aria-label={format(t.common.openPhoto, { label: photo.label, company: item.company })}
                                  onClick={() =>
                                    setGalleryModal({
                                      isOpen: true,
                                      company: item.company,
                                      gallery,
                                      index: photoIndex,
                                    })
                                  }
                                  className="relative z-20 h-12 w-12 shrink-0 sm:h-14 sm:w-14 overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/70"
                                  style={{
                                    backgroundImage: photo.image ? `url("${photo.image}")` : photo.gradient,
                                  }}
                                >
                                  <span className="absolute inset-0 bg-black/20" />
                                </button>
                              ))}
                              {remainingGallery.length > 0 && (
                                <button
                                  key={`${item.company}-peek-more`}
                                  type="button"
                                  aria-label={format(t.common.openMorePhotos, { count: remainingGallery.length, company: item.company })}
                                title={t.experience.moreMoments}
                                  onClick={() =>
                                    setGalleryModal({
                                      isOpen: true,
                                      company: item.company,
                                      gallery,
                                      index: gallery.indexOf(remainingGallery[0]),
                                    })
                                  }
                                  className="relative z-20 h-12 w-12 shrink-0 sm:h-14 sm:w-14 overflow-hidden rounded-lg bg-cover bg-center transition-transform duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/70"
                                  style={{
                                    backgroundImage: remainingGallery[0].image
                                      ? `url("${remainingGallery[0].image}")`
                                      : remainingGallery[0].gradient,
                                  }}
                                >
                                  <span className="absolute inset-0 bg-black/45 transition-colors group-hover/moments:bg-black/35" />
                                  <span className="absolute inset-0 flex items-center justify-center text-sm font-black tracking-tight text-white">
                                    +{remainingGallery.length}
                                  </span>
                                </button>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-[10px] font-black uppercase tracking-[0.24em] text-turquoise">
                                {t.experience.momentsTitle}
                              </p>
                              <p className="mt-1 truncate text-xs font-medium text-default-500 dark:text-default-400">
                                {format(t.common.photoCount, { count: gallery.length })}
                              </p>
                            </div>
                            <svg
                              aria-hidden="true"
                              viewBox="0 0 24 24"
                              className="h-4 w-4 shrink-0 text-turquoise transition-transform duration-300 group-hover/moments:translate-x-0.5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                            >
                              <path d="M5 12h14" />
                              <path d="m12 5 7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`col-start-2 row-start-2 self-center overflow-clip rounded-[2rem] border border-black/10 dark:border-white/10 bg-white/50 dark:bg-default-100/30 backdrop-blur-md transition-all duration-300 hover:border-turquoise/50 shadow-none ${isRight ? "md:col-start-3" : "md:col-start-1"} md:row-start-1`}>
                  <div className="p-5 md:p-8">
                    <div className="mb-7">
                      <h4 className="text-2xl font-black tracking-tight text-foreground md:text-4xl">
                        {item.company}
                      </h4>
                      <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em] text-default-500 dark:text-default-400">
                        {work.location}
                      </p>
                      {item.via && (
                        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.16em] text-turquoise">
                          {format(t.experience.via, { company: item.via })}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-col gap-4">
                      {item.roles.map((role) => {
                        const roleText = workRoles[role.id];
                        const duration = role.end ? roleText.duration : calculateDuration(role.start);
                        const jobDesc = roleText.jobDesc;

                        const rowContent = (
                          <div className="flex flex-col gap-3">
                            <div className="flex items-start justify-between gap-3">
                              <h5 className="min-w-0 text-lg font-black leading-tight text-foreground md:text-xl group-hover/role:text-turquoise transition-colors">
                                {roleText.position}
                              </h5>
                              <span className="w-fit shrink-0 rounded-full border border-turquoise/20 bg-turquoise/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-turquoise">
                                {roleText.type}
                              </span>
                            </div>

                            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-default-500 dark:text-default-400">
                              <span>{roleText.date}</span>
                              {duration && (
                                <>
                                  <span className="h-1 w-1 rounded-full bg-turquoise/50" />
                                  <span className="text-turquoise">
                                    {duration}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        );

                        const rowClassName =
                          "relative w-full rounded-2xl border border-black/10 bg-background/50 p-4 text-left dark:border-white/10";

                        return jobDesc ? (
                          <button
                            key={role.id}
                            type="button"
                            onClick={() => setModal({ isOpen: true, position: roleText.position, jobDesc })}
                            aria-haspopup="dialog"
                            className={`${rowClassName} group/role transition-all duration-300 hover:border-turquoise/30 hover:bg-turquoise/[0.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise/70`}
                          >
                            {rowContent}
                          </button>
                        ) : (
                          <div key={role.id} className={rowClassName}>
                            {rowContent}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Role Detail Modal */}
      <Modal
        isOpen={modal.isOpen}
        onOpenChange={(open) => setModal((prev) => ({ ...prev, isOpen: open }))}
        backdrop="blur"
        classNames={{
          base: "bg-background/80 border border-white/10 shadow-2xl",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-turquoise uppercase tracking-[0.2em] font-black text-sm">
                {modal.position}
              </ModalHeader>
              <ModalBody>
                <ul className="flex flex-col gap-4 py-2">
                  {modal.jobDesc.map((job, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 font-medium leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-turquoise mt-1.5 flex-shrink-0" />
                      <span className="min-w-0 break-words">{job}</span>
                    </li>
                  ))}
                </ul>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose} className="font-bold">
                  {t.common.close}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Experience Gallery Lightbox */}
      <Modal
        isOpen={galleryModal.isOpen}
        onOpenChange={(open) => setGalleryModal((prev) => ({ ...prev, isOpen: open }))}
        size="3xl"
        backdrop="blur"
        classNames={{
          base: "bg-background/90 border border-white/10 shadow-2xl",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <span className="text-xs font-black uppercase tracking-[0.2em] text-turquoise">{activeGalleryItem?.label}</span>
                <span className="text-xl font-black tracking-tight text-foreground">{galleryModal.company}</span>
              </ModalHeader>
              <ModalBody>
                {activeGalleryItem && (
                  <div className="overflow-hidden rounded-2xl border border-white/10">
                    <div
                      className="relative aspect-[4/3] min-h-64 w-full bg-cover bg-center"
                      style={{ backgroundImage: activeGalleryItem.image ? `url("${activeGalleryItem.image}")` : activeGalleryItem.gradient }}
                    >
                      <button
                        type="button"
                        aria-label={t.experience.previousPhoto}
                        disabled={galleryModal.index === 0}
                        onClick={() => changeGalleryPhoto(-1)}
                        className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="m15 18-6-6 6-6" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        aria-label={t.experience.nextPhoto}
                        disabled={galleryModal.index === galleryModal.gallery.length - 1}
                        onClick={() => changeGalleryPhoto(1)}
                        className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/45 text-white transition hover:bg-black/65 disabled:pointer-events-none disabled:opacity-25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                      >
                        <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                          <path d="m9 18 6-6-6-6" />
                        </svg>
                      </button>
                    </div>
                    <p className="border-t border-white/10 bg-black/10 px-5 py-4 text-sm font-medium leading-6 text-default-500 dark:text-default-400">
                      {activeGalleryItem.caption}
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <span className="mr-auto self-center text-xs font-black uppercase tracking-[0.18em] text-default-500 dark:text-default-400">
                  {galleryModal.gallery.length > 0 ? `${galleryModal.index + 1} / ${galleryModal.gallery.length}` : ""}
                </span>
                <Button color="default" variant="light" onPress={onClose} className="font-bold">
                  {t.common.close}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </section>
  );
}
