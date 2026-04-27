<template>
  <div class="card-container flex flex-column">
    <div v-if="!!props.title || !!props.description || !!$slots.actions" class="card-header">
      <!-- 첫 번째 줄: 타이틀 + (디스크립션이 없을 때) 액션 -->
      <div class="card-header-inner">
        <span v-if="!!props.title" class="card-title">
          {{ title }}
        </span>
        <!-- 디스크립션이 없으면 액션을 타이틀과 같은 줄에 배치 -->
        <div v-if="!props.description && !!$slots.actions" class="card-actions-right">
          <slot name="actions"/>
        </div>
      </div>
    
      <!-- 두 번째 줄: 디스크립션 + (디스크립션이 있을 때) 액션 -->
      <div v-if="!!props.description || (!!$slots.filter && !!props.description)" class="card-header-inner">
        <div v-if="!!props.description" class="card-description">
          {{ description }}
        </div>
        <div v-if="!!$slots.filter" class="card-actions-left">
          <slot name="filter"/>
        </div>
        <!-- 디스크립션이 있으면 액션을 디스크립션과 같은 줄에 배치 -->
        <div v-if="!!props.description && !!$slots.actions" class="card-actions-right">
          <slot name="actions"/>
        </div>
      </div>
    </div>
    <div v-if="!!$slots.content" :class="`card-wrapper`" :style="{ backgroundColor: props.backgroundColor }">
      <div class="card-content h100p">
        <slot name="content"/>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * @vue/component
 * @description 제목, 설명, 액션, 콘텐츠를 포함할 수 있는 유연한 카드 컴포넌트입니다.
 *              헤더와 콘텐츠 영역으로 나뉘며, 다양한 스타일링 옵션을 제공합니다.
 *
 * @example
 * <Card
 *   title="사용자 정보"
 *   description="사용자의 상세 정보를 표시합니다"
 *   backgroundColor="#f5f5f5"
 *   :noBorder="false"
 * >
 *   <template #actions>
 *     <Button>편집</Button>
 *     <Button>삭제</Button>
 *   </template>
 *   <template #content>
 *     <UserProfile />
 *   </template>
 * </Card>
 *
 * @props
 * - title?: 카드 상단에 표시될 제목
 * - description?: 제목 하단에 표시될 설명 텍스트
 * - backgroundColor?: 카드 배경색 (CSS 색상값)
 * - noBorder?: 테두리 제거 여부 (기본값: false)
 *
 * @slots
 * - actions: 헤더 우측에 배치되는 액션 버튼들
 * - content: 카드의 메인 콘텐츠 영역
 */

  import '@/shared/assets/scss/components/containers/card.scss'
  import type { CardProps } from '@/shared/containers/Card/Card.types'

  const props = defineProps<CardProps>()
</script>

